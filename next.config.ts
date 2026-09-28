import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All imagery is local, so no remotePatterns are required.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
