import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Newsletter } from '@/lib/models/Newsletter';
import { getSession } from '@/lib/auth';
import { AuditLog } from '@/lib/models/AuditLog';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const newsletter = await Newsletter.findById(params.id).populate('createdBy', 'name email');

        if (!newsletter) {
            return NextResponse.json({ error: 'Newsletter not found' }, { status: 404 });
        }

        return NextResponse.json(newsletter);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch newsletter' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject, content } = await req.json();
        await connectDB();

        const originalNewsletter = await Newsletter.findById(params.id);
        if (!originalNewsletter) {
            return NextResponse.json({ error: 'Newsletter not found' }, { status: 404 });
        }

        if (originalNewsletter.status === 'sent') {
            return NextResponse.json({ error: 'Cannot edit sent newsletters' }, { status: 400 });
        }

        const newsletter = await Newsletter.findByIdAndUpdate(
            params.id,
            { subject, content },
            { new: true }
        );

        // Audit Log
        await AuditLog.createLog({
            userId: session.user.id,
            userEmail: session.user.email,
            action: 'UPDATE',
            actionDescription: `Updated newsletter: ${subject}`,
            resourceType: 'newsletter',
            resourceId: newsletter._id.toString(),
            status: 'success',
            changes: {
                subject: { before: originalNewsletter.subject, after: subject },
                content: { before: '...', after: '...' } // Don't log full content
            }
        });

        return NextResponse.json(newsletter);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update newsletter' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const newsletter = await Newsletter.findByIdAndDelete(params.id);

        if (!newsletter) {
            return NextResponse.json({ error: 'Newsletter not found' }, { status: 404 });
        }

        // Audit Log
        await AuditLog.createLog({
            userId: session.user.id,
            userEmail: session.user.email,
            action: 'DELETE',
            actionDescription: `Deleted newsletter: ${newsletter.subject}`,
            resourceType: 'newsletter',
            resourceId: params.id,
            status: 'success',
        });

        return NextResponse.json({ message: 'Newsletter deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete newsletter' }, { status: 500 });
    }
}
