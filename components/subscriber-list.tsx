'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { formatDate } from '@/lib/utils';
import { ReusableModal } from '@/components/reusable-modal';
import DenseTable, { DenseTableColumn, DenseTableAction } from '@/components/dense-table';

interface Subscriber {
    _id: string;
    email: string;
    createdAt: string;
    active: boolean;
}

export default function SubscriberList({ subscribers }: { subscribers: Subscriber[] }) {
    const router = useRouter();
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/subscribers/${deleteId}`, { method: 'DELETE' });
            if (res.ok) {
                toast({
                    title: "Subscriber removed",
                    description: "The subscriber has been successfully removed.",
                });
                router.refresh();
                setDeleteId(null);
            } else {
                throw new Error('Failed to delete subscriber');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete subscriber.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: DenseTableColumn<Subscriber>[] = [
        {
            key: 'email',
            header: 'Email',
            className: 'font-medium text-foreground',
        },
        {
            key: 'createdAt',
            header: 'Joined Date',
            render: (subscriber) => (
                <span className="text-muted-foreground">
                    {formatDate(subscriber.createdAt)}
                </span>
            ),
        },
        {
            key: 'active',
            header: 'Status',
            render: (subscriber) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscriber.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                    }`}>
                    {subscriber.active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ];

    const actions: DenseTableAction<Subscriber> = {
        render: (subscriber) => (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(subscriber._id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                title="Remove Subscriber"
            >
                <Trash className="h-4 w-4" />
            </Button>
        ),
    };

    return (
        <>
            <DenseTable
                data={subscribers}
                columns={columns}
                actions={actions}
                getRowKey={(sub) => sub._id}
            />

            <ReusableModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title="Remove Subscriber"
                description="Are you sure you want to remove this subscriber? They will no longer receive newsletters."
                primaryAction={{
                    label: "Remove",
                    onClick: handleDelete,
                    variant: "destructive",
                    loading: isDeleting
                }}
                secondaryAction={{
                    label: "Cancel",
                    onClick: () => setDeleteId(null)
                }}
            />
        </>
    );
}
