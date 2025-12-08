import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Subscriber } from '@/lib/models/Subscriber';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            return NextResponse.json(
                { message: 'This email is already subscribed.' },
                { status: 409 } // Conflict
            );
        }

        const newSubscriber = await Subscriber.create({ email });

        return NextResponse.json(
            { message: 'Successfully subscribed!', subscriber: newSubscriber },
            { status: 201 }
        );

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
