/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_AI_API_KEY: process.env.NEXT_PUBLIC_AI_API_KEY,
    NEXT_PUBLIC_AI_MODEL: process.env.NEXT_PUBLIC_AI_MODEL,
    NEXT_PUBLIC_AI_MAX_TOKENS: process.env.NEXT_PUBLIC_AI_MAX_TOKENS,
    NEXT_PUBLIC_AI_TEMPERATURE: process.env.NEXT_PUBLIC_AI_TEMPERATURE,
    NEXT_PUBLIC_AI_API_ENDPOINT: process.env.NEXT_PUBLIC_AI_API_ENDPOINT,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mendeserve.com',
      },
      {
        protocol: 'https',
        hostname: 'www.menshairstylestoday.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'haircutinspiration.com',
      }
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://api.huggingface.co https://api.your-domain.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 