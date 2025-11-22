import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { getSession } from '@/lib/auth';
import { UTApi } from 'uploadthing/server';


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

    const updateData = {
      ...data,
      publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
      editedBy: session.user.id, // Set the editor's user ID
    };

    const blog = await Blog.findByIdAndUpdate(params.id, updateData, { new: true });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}