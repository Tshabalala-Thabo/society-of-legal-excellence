'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import type { Blog } from '@/lib/types/blog';
import PageHeader from '@/components/page-header';
import { ArrowLeft, Edit, Trash2, Calendar, User, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BlogViewPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch blog');
                const data = await res.json();
                setBlog(data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load blog post",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [params.id, toast]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/blogs/${params.id}`, { method: 'DELETE' });
            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Blog post deleted successfully",
                });
                router.push('/admin/blogs');
                router.refresh();
            } else {
                throw new Error('Failed to delete blog');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete blog post",
                action: <ToastAction altText="Try again" onClick={handleDelete}>Try again</ToastAction>,
            });
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!blog) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Blog not found</h2>
                <Button asChild variant="outline">
                    <Link href="/admin/blogs">Back to Blogs</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title={blog.title}
                showBackButton={true}
                action={
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/admin/blogs/${blog._id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                }
            />

            <div className="bg-card border border-border shadow-sm p-6 space-y-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b border-border pb-4">
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {blog.author}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(blog.createdAt)}
                    </div>
                    <div className="flex items-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {blog.published ? 'Published' : 'Draft'}
                        </span>
                    </div>
                </div>

                {/* Cover Image */}
                {blog.coverImage && (
                    <div className="relative aspect-[3/2] w-full max-w-3xl mx-auto overflow-hidden rounded-md border border-border">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap">{blog.content}</div>
                </div>
            </div>
        </div>
    );
}
