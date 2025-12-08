import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Newsletter } from '@/lib/models/Newsletter';
import { User } from '@/lib/models/User'; // Ensure User model is registered
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Send } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import NewsletterActions from '@/components/newsletter-actions'; // Client component for actions

async function getNewsletter(id: string) {
    await connectDB();
    // Ensure User model is registered for populate
    User;
    const newsletter = await Newsletter.findById(id).populate('createdBy', 'name email').lean();
    if (!newsletter) return null;
    return JSON.parse(JSON.stringify(newsletter));
}

export default async function ViewNewsletterPage({ params }: { params: { id: string } }) {
    const newsletter = await getNewsletter(params.id);

    if (!newsletter) {
        notFound();
    }

    return (
        <div className="mx-auto">
            <PageHeader
                title={newsletter.subject}
                subtitle={`Created by ${newsletter.createdBy?.name || newsletter.createdBy?.email} on ${formatDate(newsletter.createdAt)}`}
                showBackButton
                action={
                    newsletter.status === 'draft' ? (
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href={`/admin/newsletters/${newsletter._id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <NewsletterActions newsletter={newsletter} />
                        </div>
                    ) : (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Sent on {formatDate(newsletter.sentAt)}
                        </div>
                    )
                }
            />

            <div className="bg-card shadow-md p-8 border border-border rounded-lg">
                <div className="prose max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap font-sans text-foreground">
                        {newsletter.content}
                    </div>
                </div>
            </div>
        </div>
    );
}
