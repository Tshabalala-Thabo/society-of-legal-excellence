'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit, Trash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { formatDate } from '@/lib/utils';
import { ReusableModal } from '@/components/reusable-modal';
import DenseTable, { DenseTableColumn, DenseTableAction } from '@/components/dense-table';

interface Newsletter {
    _id: string;
    subject: string;
    status: 'draft' | 'sent';
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    sentAt?: string;
    recipientCount: number;
}

export default function NewsletterList({ newsletters }: { newsletters: Newsletter[] }) {
    const router = useRouter();
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/newsletters/${deleteId}`, { method: 'DELETE' });
            if (res.ok) {
                toast({
                    title: "Newsletter deleted",
                    description: "The newsletter has been removed.",
                });
                router.refresh();
                setDeleteId(null);
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
        }
    };

    const columns: DenseTableColumn<Newsletter>[] = [
        {
            key: 'subject',
            header: 'Subject',
            className: 'font-medium text-foreground',
        },
        {
            key: 'status',
            header: 'Status',
            render: (newsletter) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${newsletter.status === 'sent'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {newsletter.status === 'sent' ? 'Sent' : 'Draft'}
                </span>
            ),
        },
        {
            key: 'createdBy',
            header: 'Created By',
            render: (newsletter) => (
                <span className="text-muted-foreground">
                    {newsletter.createdBy?.name || newsletter.createdBy?.email || 'Unknown'}
                </span>
            ),
        },
        {
            key: 'createdAt',
            header: 'Date',
            render: (newsletter) => (
                <span className="text-muted-foreground">
                    {formatDate(newsletter.createdAt)}
                </span>
            ),
        },
    ];

    const actions: DenseTableAction<Newsletter> = {
        render: (newsletter) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/newsletters/${newsletter._id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </Link>
                    </DropdownMenuItem>
                    {newsletter.status === 'draft' && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/newsletters/${newsletter._id}/edit`} className="cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDeleteId(newsletter._id)}
                                className="text-destructive focus:text-destructive cursor-pointer"
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    };

    return (
        <>
            <DenseTable
                data={newsletters}
                columns={columns}
                actions={actions}
                getRowKey={(newsletter) => newsletter._id}
            />

            <ReusableModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
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
                    onClick: () => setDeleteId(null)
                }}
            />
        </>
    );
}
