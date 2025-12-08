import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models/Blog';
import BlogList from '@/components/blog-list';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        action={
          <Button asChild>
            <Link href="/admin/blogs/create">
              + Create New Post
            </Link>
          </Button>
        }
      />
      <BlogList blogs={blogs} />
    </div>
  );
}