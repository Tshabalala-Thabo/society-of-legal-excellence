import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Newsletter } from '@/lib/models/Newsletter';
import { User } from '@/lib/models/User'; // Ensure User model is registered
import NewsletterList from '@/components/newsletter-list';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';
import { Plus } from 'lucide-react';

async function getNewsletters() {
    await connectDB();
    // Ensure User model is registered for populate
    User;
    const newsletters = await Newsletter.find()
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .lean();
    return JSON.parse(JSON.stringify(newsletters));
}

export default async function NewslettersPage() {
    const newsletters = await getNewsletters();

    return (
        <div>
            <PageHeader
                title="Newsletters"
                subtitle="Manage your email campaigns"
                action={
                    <Button asChild>
                        <Link href="/admin/newsletters/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Newsletter
                        </Link>
                    </Button>
                }
            />
            <NewsletterList newsletters={newsletters} />
        </div>
    );
}
