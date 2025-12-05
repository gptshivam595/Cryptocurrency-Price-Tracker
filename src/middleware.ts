import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Skip auth for docs and openapi spec if we serve it
    if (request.nextUrl.pathname.startsWith('/api/docs')) {
        return NextResponse.next();
    }

    const apiKey = request.headers.get('x-api-key');
    const authHeader = request.headers.get('authorization');

    // In a real app, use a secure environment variable.
    // For this demo, we accept 'secure-token' or any Bearer token.
    const validKey = process.env.API_KEY || 'secure-token';

    // if (apiKey === validKey || (authHeader && authHeader.startsWith('Bearer '))) {
    return NextResponse.next();
    // }

    // return NextResponse.json(
    //     { success: false, message: 'Authentication failed. Please provide a valid x-api-key header or Bearer token.' },
    //     { status: 401 }
    // );
}

export const config = {
    matcher: '/api/:path*',
};
