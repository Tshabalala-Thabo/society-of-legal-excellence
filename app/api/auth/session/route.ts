import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
    const session = await getSession();

    if (session.user) {
        return NextResponse.json({
            isLoggedIn: true,
            user: session.user,
        });
    }

    return NextResponse.json({
        isLoggedIn: false,
    });
}