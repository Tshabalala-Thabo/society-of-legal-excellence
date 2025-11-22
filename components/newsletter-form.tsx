'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

interface NewsletterFormProps {
    newsletter?: {
        _id: string;
        subject: string;
        content: string;
    };
}

export default function NewsletterForm({ newsletter }: NewsletterFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: newsletter?.subject || '',
        content: newsletter?.content || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = newsletter ? `/api/newsletters/${newsletter._id}` : '/api/newsletters';
            const method = newsletter ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast({
                    title: newsletter ? "Newsletter updated!" : "Newsletter created!",
                    description: "Your draft has been saved.",
                });
                router.push('/admin/newsletters');
                router.refresh();
            } else {
                throw new Error('Failed to save newsletter');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save newsletter.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card shadow-md p-6 space-y-6 border border-border rounded-lg">
            <div className="space-y-2">
                <Label htmlFor="subject">Subject Line <span className="text-primary">*</span></Label>
                <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter a catchy subject..."
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content <span className="text-primary">*</span></Label>
                <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your newsletter content here..."
                    required
                    rows={15}
                    className="font-mono text-sm"
                />
            </div>

            <div className="flex flex-row-reverse gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : newsletter ? 'Update Draft' : 'Create Draft'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
