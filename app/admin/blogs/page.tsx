import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import BlogList from '@/components/blog-list';
import { Button } from '@/components/ui/button';

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
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/admin/blogs/create">
            + Create New Post
          </Link>
        </Button>
      </div>
      <BlogList blogs={blogs} />
    </div>
  );
}