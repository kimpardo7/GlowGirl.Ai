/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
}

module.exports = nextConfig 