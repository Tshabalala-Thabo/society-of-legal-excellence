import PageHeader from '@/components/page-header';
import NewsletterForm from '@/components/newsletter-form';

export default function CreateNewsletterPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader
                title="Create Newsletter"
                subtitle="Draft a new email campaign"
                showBackButton
            />
            <NewsletterForm />
        </div>
    );
}
