import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/lib/models/Contact';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const contact = await Contact.findById(params.id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Failed to fetch contact:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const body = await request.json();
        const { read, responded } = body;

        const updateData: any = {};

        if (typeof read === 'boolean') {
            updateData.read = read;
        }

        if (typeof responded === 'boolean') {
            updateData.responded = responded;
            if (responded) {
                updateData.respondedAt = new Date();
            } else {
                updateData.respondedAt = null;
            }
        }

        const contact = await Contact.findByIdAndUpdate(
            params.id,
            updateData,
            { new: true }
        );

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Failed to update contact:', error);
        return NextResponse.json(
            { error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const contact = await Contact.findByIdAndDelete(params.id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Failed to delete contact:', error);
        return NextResponse.json(
            { error: 'Failed to delete contact' },
            { status: 500 }
        );
    }
}
