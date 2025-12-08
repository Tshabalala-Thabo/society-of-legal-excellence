import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Subscriber } from '@/lib/models/Subscriber';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = params;

        const deletedSubscriber = await Subscriber.findByIdAndDelete(id);

        if (!deletedSubscriber) {
            return NextResponse.json(
                { message: 'Subscriber not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Subscriber deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete subscriber error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
