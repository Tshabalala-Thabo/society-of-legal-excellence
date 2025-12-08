import { notFound, redirect } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { Newsletter } from '@/lib/models/Newsletter';
import PageHeader from '@/components/page-header';
import NewsletterForm from '@/components/newsletter-form';

async function getNewsletter(id: string) {
    await connectDB();
    const newsletter = await Newsletter.findById(id).lean();
    if (!newsletter) return null;
    return JSON.parse(JSON.stringify(newsletter));
}

export default async function EditNewsletterPage({ params }: { params: { id: string } }) {
    const newsletter = await getNewsletter(params.id);

    if (!newsletter) {
        notFound();
    }

    if (newsletter.status === 'sent') {
        redirect(`/admin/newsletters/${params.id}`);
    }

    return (
        <div className="mx-auto">
            <PageHeader
                title="Edit Newsletter"
                subtitle="Update your email campaign draft"
                showBackButton
            />
            <NewsletterForm newsletter={newsletter} />
        </div>
    );
}
