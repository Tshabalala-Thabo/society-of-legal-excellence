'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Blog } from '@/lib/types/blog';
import { Button } from '@/components/ui/button';

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    // We can use a toast with action instead of confirm dialog, or keep confirm
    // Keeping confirm for now as it's safer, but adding toast for result
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({
          title: "Blog deleted successfully",
          description: "The blog post has been removed.",
        });
        router.refresh();
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "We couldn't complete your request!",
        description: "There was a problem deleting the blog post.",
        action: <ToastAction altText="Try again" onClick={() => handleDelete(id)}>Try again</ToastAction>,
      });
    } finally {
      setDeleting(null);
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="bg-card shadow-md p-8 text-center border border-border">
        <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-card shadow-md p-6 border border-border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-foreground">{blog.title}</h2>
                <span
                  className={`px-2 py-1 text-xs ${blog.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-secondary text-secondary-foreground'
                    }`}
                >
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="ghost" className="text-primary hover:text-primary">
                <Link href={`/admin/blogs/${blog._id}/edit`}>
                  Edit
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDelete(blog._id)}
                disabled={deleting === blog._id}
                className="text-destructive hover:text-destructive"
              >
                {deleting === blog._id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}