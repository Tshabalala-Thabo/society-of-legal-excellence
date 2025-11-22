import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { getSession } from '@/lib/auth';
import { UTApi } from 'uploadthing/server';
import { createAuditLog } from '@/lib/audit';

// GET single blog
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// UPDATE blog (protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    await connectDB();

    // Get original blog for change tracking
    const originalBlog = await Blog.findById(params.id);
    if (!originalBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const updateData = {
      ...data,
      publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
      editedBy: session.user.id, // Set the editor's user ID
    };

    // Check if cover image has changed (removed or replaced)
    if (originalBlog.coverImage && originalBlog.coverImage !== data.coverImage) {
      try {
        const utapi = new UTApi();
        const fileKey = originalBlog.coverImage.split('/').pop();
        if (fileKey) {
          await utapi.deleteFiles(fileKey);
        }
      } catch (error) {
        console.error('Failed to delete old image from UploadThing:', error);
      }
    }

    const blog = await Blog.findByIdAndUpdate(params.id, updateData, { new: true });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Calculate changes (simplified)
    const changes: any = {};
    if (originalBlog.title !== blog.title) changes.title = { before: originalBlog.title, after: blog.title };
    if (originalBlog.published !== blog.published) changes.published = { before: originalBlog.published, after: blog.published };
    if (originalBlog.content !== blog.content) changes.content = { before: '...', after: '...' }; // Don't log full content

    await createAuditLog({
      session,
      action: 'UPDATE',
      resourceType: 'blog_post',
      resourceId: blog._id.toString(),
      description: `Updated blog post '${blog.title}'`,
      changes,
      metadata: { slug: blog.slug }
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    await createAuditLog({
      session,
      action: 'UPDATE',
      resourceType: 'blog_post',
      resourceId: params.id,
      description: 'Failed to update blog post',
      status: 'failed',
      error: error.message
    });
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE blog (protected)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete cover image from UploadThing if it exists
    if (blog.coverImage) {
      try {
        const utapi = new UTApi();
        // Extract file key from URL
        // URL format: https://utfs.io/f/KEY or similar
        const fileKey = blog.coverImage.split('/').pop();
        if (fileKey) {
          await utapi.deleteFiles(fileKey);
        }
      } catch (error) {
        console.error('Failed to delete image from UploadThing:', error);
        // Continue execution even if image deletion fails
      }
    }

    await createAuditLog({
      session,
      action: 'DELETE',
      resourceType: 'blog_post',
      resourceId: params.id,
      description: `Deleted blog post '${blog.title}'`,
      metadata: { slug: blog.slug }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    await createAuditLog({
      session,
      action: 'DELETE',
      resourceType: 'blog_post',
      resourceId: params.id,
      description: 'Failed to delete blog post',
      status: 'failed',
      error: error.message
    });
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}