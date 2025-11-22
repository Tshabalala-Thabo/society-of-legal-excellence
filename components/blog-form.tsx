'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BlogFormProps {
  blog?: {
    _id: string;
    title: string;
    content: string;
    excerpt?: string;
    author: string;
    coverImage?: string;
    published: boolean;
    tags?: string[];
  };
}

export default function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    excerpt: blog?.excerpt || '',
    author: blog?.author || '',
    coverImage: blog?.coverImage || '',
    published: blog?.published || false,
    tags: blog?.tags?.join(', ') || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      const url = blog ? `/api/blogs/${blog._id}` : '/api/blogs';
      const method = blog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        alert('Failed to save blog');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <Label className="mb-2 block">
          Title <span className="text-[#f6ce54]">*</span>
        </Label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Author <span className="text-[#f6ce54]">*</span>
        </Label>
        <Input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Excerpt
        </Label>
        <Textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Content <span className="text-[#f6ce54]">*</span>
        </Label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={15}
          className="font-mono text-sm"
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Cover Image URL
        </Label>
        <Input
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Tags (comma-separated)
        </Label>
        <Input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="law, legal, technology"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded-none focus:ring-blue-500"
        />
        <Label htmlFor="published" className="ml-2">
          Publish immediately
        </Label>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}