import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import BlogForm from '@/components/blog-form';
import { notFound } from 'next/navigation';

async function getBlog(id: string) {
  await connectDB();
  const blog = await Blog.findById(id).lean();
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Blog Post</h1>
      <BlogForm blog={blog} />
    </div>
  );
}