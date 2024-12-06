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
      },
      {
        protocol: 'https',
        hostname: 'enxxhyedzkatrwiwapzl.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
    unoptimized: true
  },
  output: 'standalone',
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://enxxhyedzkatrwiwapzl.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueHhoeWVkemthdHJ3aXdhcHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTY3MjMsImV4cCI6MjA0ODg3MjcyM30.bj-PaEN9tDYSX2zc-I4Vn7WmKtXF1L--tzJm_3IR4WE'
  }
};

module.exports = nextConfig;