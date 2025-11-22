import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import BlogList from '@/components/blog-list';

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          href="/admin/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create New Post
        </Link>
      </div>
      <BlogList blogs={blogs} />
    </div>
  );
}