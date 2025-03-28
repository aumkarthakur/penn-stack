import { NextResponse } from 'next/server';

export async function middleware(request) {
    const protocol = request.nextUrl.protocol;
    const hostname = request.headers.get("Host");
    const homeUrl = `${protocol}//${hostname}`;
    // make sure user is authenticated by hitting /api/me
    try {
        console.log('Checking authentication');
        console.log(`${homeUrl}/api/me`);
        console.log(protocol);
        const response = await fetch(`${homeUrl}/api/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || ''
            }
        });

        // If the response is ok (status 200), user is authenticated
        if (response.ok) {
            const userData = await response.json();
            if (userData.id) {
                // User is authenticated, redirect to profile if trying to access auth pages
                return NextResponse.redirect(new URL('/user/profile', request.url));
            }
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
    
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/user/signin',
    '/user/signup'
  ],
}; 