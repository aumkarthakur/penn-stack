import { NextResponse } from 'next/server';

/**
 * Helper function to build the base URL from the request
 */
function getBaseUrl(request) {
    const protocol = request.nextUrl.protocol;
    const hostname = request.headers.get("Host");
    return `${protocol}//${hostname}`;
}

/**
 * Check if the user is authenticated by calling the /api/me endpoint
 */
async function checkAuthentication(request) {
    const baseUrl = getBaseUrl(request);
    try {
        const response = await fetch(`${baseUrl}/api/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || ''
            }
        });

        if (!response.ok) {
            return { isAuthenticated: false };
        }

        const userData = await response.json();
        return {
            isAuthenticated: Boolean(userData.id),
            userData
        };
    } catch (error) {
        console.error('Authentication check failed:', error);
        return { isAuthenticated: false, error };
    }
}

/**
 * Check if the current path is an auth page (signin/signup)
 */
function isAuthPage(pathname) {
    return pathname.startsWith('/user/signin') || pathname.startsWith('/user/signup');
}

/**
 * Main middleware function to handle authentication and redirects
 */
export async function middleware(request) {
    const { isAuthenticated } = await checkAuthentication(request);
    const pathname = request.nextUrl.pathname;

    // Handle authenticated users
    if (isAuthenticated) {
        // Redirect to profile if trying to access auth pages
        if (isAuthPage(pathname)) {
            return NextResponse.redirect(new URL('/user/profile', request.url));
        }
        return NextResponse.next();
    }

    // Handle non-authenticated users
    if (pathname.startsWith('/user/profile')) {
        return NextResponse.redirect(new URL('/user/signin', request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        '/user/signin',
        '/user/signup',
        '/user/profile'
    ],
}; 