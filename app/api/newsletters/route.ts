import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Newsletter } from '@/lib/models/Newsletter';
import { getSession } from '@/lib/auth';
import { AuditLog } from '@/lib/models/AuditLog';
import { User } from '@/lib/models/User'; // Ensure User model is registered

export async function GET() {
    try {
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const newsletters = await Newsletter.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json(newsletters);
    } catch (error) {
        console.error('Failed to fetch newsletters:', error);
        return NextResponse.json({ error: 'Failed to fetch newsletters' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject, content } = await req.json();

        if (!subject || !content) {
            return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
        }

        await connectDB();

        const newsletter = await Newsletter.create({
            subject,
            content,
            createdBy: session.user.id,
            status: 'draft',
        });

        // Audit Log
        await AuditLog.createLog({
            userId: session.user.id,
            userEmail: session.user.email,
            action: 'CREATE',
            actionDescription: `Created newsletter draft: ${subject}`,
            resourceType: 'newsletter',
            resourceId: newsletter._id.toString(),
            status: 'success',
        });

        return NextResponse.json(newsletter, { status: 201 });
    } catch (error) {
        console.error('Failed to create newsletter:', error);

        // Audit Log Failure
        const session = await getSession();
        if (session.user) {
            await AuditLog.createLog({
                userId: session.user.id,
                userEmail: session.user.email,
                action: 'CREATE',
                actionDescription: 'Failed to create newsletter',
                resourceType: 'newsletter',
                resourceId: 'unknown',
                status: 'failed',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            });
        }

        return NextResponse.json({ error: 'Failed to create newsletter' }, { status: 500 });
    }
}
