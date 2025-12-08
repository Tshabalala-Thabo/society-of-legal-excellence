import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD || 'complex_password_at_least_32_characters_long',
    cookieName: 'sle_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export interface SessionData {
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    return session;
}

export async function login(user: any) {
    const session = await getSession();
    session.user = user;
    await session.save();
}

export async function logout() {
    const session = await getSession();
    session.destroy();
}

export async function isAuthenticated() {
    const session = await getSession();
    return !!session.user;
}