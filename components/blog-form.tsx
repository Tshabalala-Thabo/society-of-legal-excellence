'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BlogCoverImageUpload from '@/components/blog-cover-image-upload';
import type { Blog } from '@/lib/types/blog';

interface BlogFormProps {
  blog?: Blog;
}

export default function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    author: blog?.author || '',
    coverImage: blog?.coverImage || '',
    published: blog?.published || false,
  });

  const handleImageChange = (blob: Blob | null) => {
    setCroppedImageBlob(blob);
    // If image is removed, clear the coverImage URL
    if (!blob) {
      setFormData({ ...formData, coverImage: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = formData.coverImage;

      // If there's a new cropped image, upload it first
      if (croppedImageBlob) {
        setUploading(true);

        // Create FormData for the upload
        const uploadFormData = new FormData();
        uploadFormData.append('file', croppedImageBlob, 'cover-image.jpg');

        // Upload to our custom API endpoint (which uses sharp + UploadThing)
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadRes.json();
        coverImageUrl = uploadData.url;
        setUploading(false);
      }

      const url = blog ? `/api/blogs/${blog._id}` : '/api/blogs';
      const method = blog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          coverImage: coverImageUrl,
        }),
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        alert('Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card shadow-md p-6 space-y-6 border border-border">
      <div>
        <Label className="mb-2 block">
          Title <span className="text-primary">*</span>
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
          Author <span className="text-primary">*</span>
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
          Content <span className="text-primary">*</span>
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
          Cover Image
        </Label>
        <BlogCoverImageUpload
          onImageChange={handleImageChange}
          initialImageUrl={formData.coverImage}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-4 h-4 text-primary focus:ring-primary"
        />
        <Label htmlFor="published" className="ml-2">
          Publish
        </Label>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading || uploading}
        >
          {uploading ? 'Uploading image...' : loading ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading || uploading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}