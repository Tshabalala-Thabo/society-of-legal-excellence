'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setDeleting(null);
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600">No blog posts yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    blog.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </div>
              {blog.excerpt && (
                <p className="text-gray-600 mb-3">{blog.excerpt}</p>
              )}
              <p className="text-sm text-gray-500">
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/blogs/${blog._id}/edit`}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                disabled={deleting === blog._id}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-50"
              >
                {deleting === blog._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}