import BlogForm from '@/components/blog-form';
import PageHeader from '@/components/page-header';

export default function CreateBlogPage() {
  return (
    <div>
      <PageHeader
        title="Create New Blog Post"
        showBackButton
      />
      <BlogForm />
    </div>
  );
}