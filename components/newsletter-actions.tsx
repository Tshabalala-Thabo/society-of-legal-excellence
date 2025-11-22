'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ReusableModal } from '@/components/reusable-modal';

export default function NewsletterActions({ newsletter }: { newsletter: any }) {
    const router = useRouter();
    const { toast } = useToast();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/newsletters/${newsletter._id}`, { method: 'DELETE' });
            if (res.ok) {
                toast({
                    title: "Newsletter deleted",
                    description: "The newsletter has been removed.",
                });
                router.push('/admin/newsletters');
                router.refresh();
            } else {
                throw new Error('Failed to delete newsletter');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete newsletter.",
            });
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
            </Button>

            <ReusableModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Newsletter"
                description="Are you sure you want to delete this newsletter? This action cannot be undone."
                primaryAction={{
                    label: "Delete",
                    onClick: handleDelete,
                    variant: "destructive",
                    loading: isDeleting
                }}
                secondaryAction={{
                    label: "Cancel",
                    onClick: () => setShowDeleteModal(false)
                }}
            />
        </>
    );
}
