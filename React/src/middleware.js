import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');
    const url = req.nextUrl.clone();

    if (url.pathname === '/login' || url.pathname === '/cadastro') {
         if (token) {
                url.pathname = '/';
                return NextResponse.redirect(url);
         }
        return NextResponse.next();
    }
    
    if (!token) {
        url.pathname = '/auth';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}
    
export const config = {
    matcher: ['/', '/eventos'],
};
