import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { addSecurityHeaders } from './config/security';

// Rate limiting map
const rateLimit = new Map();

export function middleware(request: NextRequest) {
  // Create the response
  const response = NextResponse.next();

  // Add security headers
  addSecurityHeaders(response);

  // Basic rate limiting
  const ip = request.ip ?? 'anonymous';
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000; // 15 minutes ago

  // Clean up old entries
  rateLimit.forEach((timestamp, key) => {
    if (timestamp < windowStart) {
      rateLimit.delete(key);
    }
  });

  // Check rate limit
  const requestCount = Array.from(rateLimit.entries())
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length;

  if (requestCount >= 100) { // Max 100 requests per 15 minutes
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Record this request
  rateLimit.set(`${ip}-${now}`, now);

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico (favicon file)
     * 4. public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 