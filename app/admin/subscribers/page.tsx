import { connectDB } from '@/lib/mongodb';
import { Subscriber } from '@/lib/models/Subscriber';
import SubscriberList from '@/components/subscriber-list';
import PageHeader from '@/components/page-header';

async function getSubscribers() {
    await connectDB();
    const subscribers = await Subscriber.find()
        .sort({ createdAt: -1 })
        .lean();
    return JSON.parse(JSON.stringify(subscribers));
}

export default async function SubscribersPage() {
    const subscribers = await getSubscribers();

    return (
        <div>
            <PageHeader
                title="Subscribers"
                subtitle="Manage your newsletter audience"
            />
            <SubscriberList subscribers={subscribers} />
        </div>
    );
}
