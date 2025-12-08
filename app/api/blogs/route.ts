import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import { getSession } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

// GET all blogs
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');

    const query = published === 'true' ? { published: true } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// CREATE blog (protected)
export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    await connectDB();

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const blog = await Blog.create({
      ...data,
      slug,
      publishedAt: data.published ? new Date() : null,
      createdBy: session.user.id, // Set the creator's user ID
    });

    // Log the action
    await createAuditLog({
      session,
      action: 'CREATE',
      resourceType: 'blog_post',
      resourceId: blog._id.toString(),
      description: `Created blog post '${blog.title}'`,
      metadata: { slug: blog.slug, published: blog.published }
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);

    // Log failure if possible (we might not have resource ID yet)
    await createAuditLog({
      session,
      action: 'CREATE',
      resourceType: 'blog_post',
      resourceId: 'unknown',
      description: 'Failed to create blog post',
      status: 'failed',
      error: error.message
    });

    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}