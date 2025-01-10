import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');

    if (!token && !req.nextUrl.pathname.startsWith('/pages/auth')
        && !req.nextUrl.pathname.startsWith('/pages/404')) {
        return NextResponse.redirect(new URL('/pages/auth', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/pages/home', '/pages/eventos', '/pages/((?!general).*)'],
};