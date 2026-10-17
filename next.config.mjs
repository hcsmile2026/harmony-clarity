/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/buy-credits',
        destination: '/dashboard',
        permanent: false,
      },
      {
        source: '/checkout',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
}

export default nextConfig


