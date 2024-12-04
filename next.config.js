/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/brambleappmatus/images/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/brambleappmatus/images/**',
      }
    ],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;