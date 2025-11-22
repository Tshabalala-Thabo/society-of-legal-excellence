import BlogForm from '@/components/blog-form';

export default function CreateBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Blog Post</h1>
      <BlogForm />
    </div>
  );
}