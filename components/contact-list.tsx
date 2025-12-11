'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Trash, Check, Eye, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { formatDate } from '@/lib/utils';
import { ReusableModal } from '@/components/reusable-modal';
import DenseTable, { DenseTableColumn, DenseTableAction } from '@/components/dense-table';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    read: boolean;
    responded: boolean;
    respondedAt?: string;
    createdAt: string;
}

export default function ContactList({ contacts }: { contacts: Contact[] }) {
    const router = useRouter();
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [viewContact, setViewContact] = useState<Contact | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/contact/${deleteId}`, { method: 'DELETE' });
            if (res.ok) {
                toast({
                    title: "Contact deleted",
                    description: "The contact has been successfully removed.",
                });
                router.refresh();
                setDeleteId(null);
            } else {
                throw new Error('Failed to delete contact');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete contact.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const toggleResponded = async (contact: Contact) => {
        setIsUpdating(contact._id);
        try {
            const res = await fetch(`/api/contact/${contact._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ responded: !contact.responded }),
            });

            if (res.ok) {
                toast({
                    title: contact.responded ? "Marked as not responded" : "Marked as responded",
                    description: `Contact from ${contact.name} has been updated.`,
                });
                router.refresh();
            } else {
                throw new Error('Failed to update contact');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update contact status.",
            });
        } finally {
            setIsUpdating(null);
        }
    };

    const markAsRead = async (contact: Contact) => {
        if (contact.read) return;

        try {
            await fetch(`/api/contact/${contact._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: true }),
            });
            router.refresh();
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleView = (contact: Contact) => {
        markAsRead(contact);
        setViewContact(contact);
    };

    const columns: DenseTableColumn<Contact>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (contact) => (
                <div className="flex items-center gap-2">
                    {!contact.read && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" title="Unread" />
                    )}
                    <span className={`font-medium ${!contact.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {contact.name}
                    </span>
                </div>
            ),
        },
        {
            key: 'email',
            header: 'Email',
            className: 'text-muted-foreground',
        },
        {
            key: 'subject',
            header: 'Subject',
            render: (contact) => (
                <span className="text-muted-foreground truncate max-w-[200px] block">
                    {contact.subject}
                </span>
            ),
        },
        {
            key: 'createdAt',
            header: 'Date',
            render: (contact) => (
                <span className="text-muted-foreground text-sm">
                    {formatDate(contact.createdAt)}
                </span>
            ),
        },
        {
            key: 'responded',
            header: 'Status',
            render: (contact) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${contact.responded
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {contact.responded ? 'Responded' : 'Pending'}
                </span>
            ),
        },
    ];

    const actions: DenseTableAction<Contact> = {
        render: (contact) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleView(contact)}>
                        <Eye className="h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => toggleResponded(contact)}
                        disabled={isUpdating === contact._id}
                    >
                        <Check className="h-4 w-4" />
                        {contact.responded ? 'Mark as Pending' : 'Mark as Responded'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setDeleteId(contact._id)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash className="h-4 w-4" />
                        Delete Contact
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    };

    return (
        <>
            <DenseTable
                data={contacts}
                columns={columns}
                actions={actions}
                getRowKey={(contact) => contact._id}
            />

            {/* Delete Confirmation Modal */}
            <ReusableModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title="Delete Contact"
                description="Are you sure you want to delete this contact? This action cannot be undone."
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

            {/* View Contact Modal */}
            <ReusableModal
                isOpen={!!viewContact}
                onClose={() => setViewContact(null)}
                title="Contact Details"
            >
                {viewContact && (
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">From</h4>
                            <p className="text-foreground font-medium">{viewContact.name}</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <a href={`mailto:${viewContact.email}`} className="text-primary hover:underline">
                                    {viewContact.email}
                                </a>
                            </div>
                            {viewContact.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <a href={`tel:${viewContact.phone}`} className="text-primary hover:underline">
                                        {viewContact.phone}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Subject</h4>
                            <p className="text-foreground">{viewContact.subject}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Message</h4>
                            <p className="text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded-lg text-sm">
                                {viewContact.message}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-xs text-muted-foreground">
                                Received: {formatDate(viewContact.createdAt)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${viewContact.responded
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {viewContact.responded ? 'Responded' : 'Pending'}
                            </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    toggleResponded(viewContact);
                                    setViewContact(null);
                                }}
                            >
                                {viewContact.responded ? 'Mark as Pending' : 'Mark as Responded'}
                            </Button>
                            <Button
                                asChild
                                className="flex-1"
                            >
                                <a href={`mailto:${viewContact.email}?subject=Re: ${viewContact.subject}`}>
                                    Reply via Email
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
            </ReusableModal>
        </>
    );
}
