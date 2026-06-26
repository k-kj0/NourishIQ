/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'placehold.co'],
  },
}

module.exports = nextConfig
