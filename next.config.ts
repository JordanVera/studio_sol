import type { NextConfig } from 'next';

const config: NextConfig = {
  agentRules: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Serve files from /public directly. Vercel's Image Optimization API
    // returns 402 on this project, which breaks all next/image components.
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/shop', destination: '/flowers', permanent: true },
      { source: '/cart', destination: '/contact', permanent: true },
      {
        source: '/order-confirmation',
        destination: '/contact',
        permanent: true,
      },
      { source: '/admin', destination: '/', permanent: true },
    ];
  },
};

export default config;
