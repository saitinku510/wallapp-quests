/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wall-questing-assets.s3.amazonaws.com',
        port: '',
      },
    ],
  },

}

module.exports = nextConfig
