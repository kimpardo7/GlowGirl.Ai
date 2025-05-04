import { NextResponse } from 'next/server';

// Security middleware configuration
export const securityConfig = {
  // CORS configuration
  cors: {
    allowedOrigins: ['http://localhost:3000'], // Add your domains
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  },
  
  // Cookie security configuration
  cookies: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
  
  // Session configuration
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
    secure: process.env.NODE_ENV === 'production',
  },
};

// Middleware to add security headers
export function addSecurityHeaders(response: NextResponse) {
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Add Content Security Policy
  response.headers.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.your-domain.com;
    media-src 'self';
    frame-src 'self';
  `.replace(/\s+/g, ' ').trim());
  
  return response;
} 