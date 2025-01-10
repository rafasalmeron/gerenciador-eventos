import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');

    if (!token && !req.nextUrl.pathname.startsWith('/auth') && !req.nextUrl.pathname.startsWith('/404')) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/eventos'],
};