'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Blog } from '@/lib/types/blog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit, Trash, ImageIcon } from 'lucide-react';

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { formatDate } from '@/lib/utils';

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-card shadow-md border border-border flex flex-col h-full group overflow-hidden">
          {/* Image Section */}
          <div className="relative aspect-[3/2] w-full bg-muted border-b border-border">
            {blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/30">
                <ImageIcon className="w-12 h-12 opacity-20" />
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 text-xs font-medium shadow-sm border ${blog.published
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  }`}
              >
                {blog.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground line-clamp-2 leading-tight" title={blog.title}>
                {blog.title}
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 -mr-2 text-muted-foreground hover:text-foreground">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/blogs/${blog._id}`} className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/blogs/${blog._id}/edit`} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(blog._id)}
                    className="text-destructive focus:text-destructive cursor-pointer"
                    disabled={deleting === blog._id}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    {deleting === blog._id ? 'Deleting...' : 'Delete'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50">
              <span className="truncate max-w-[120px]" title={blog.author}>
                By {blog.author}
              </span>
              <span>
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}