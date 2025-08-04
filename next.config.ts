import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable ISR for static generation
  trailingSlash: true,
  // Optional: Add custom headers for better caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=300',
          },
        ],
      },
    ]
  },
}

export default nextConfig
