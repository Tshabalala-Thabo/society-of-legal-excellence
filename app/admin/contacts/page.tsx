import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/lib/models/Contact';
import ContactList from '@/components/contact-list';
import PageHeader from '@/components/page-header';

async function getContacts() {
    await connectDB();
    const contacts = await Contact.find()
        .sort({ createdAt: -1 })
        .lean();
    return JSON.parse(JSON.stringify(contacts));
}

export default async function ContactsPage() {
    const contacts = await getContacts();

    const pendingCount = contacts.filter((c: any) => !c.responded).length;

    return (
        <div>
            <PageHeader
                title="Contact Submissions"
                subtitle={`${contacts.length} total contacts • ${pendingCount} pending response`}
            />
            <ContactList contacts={contacts} />
        </div>
    );
}
