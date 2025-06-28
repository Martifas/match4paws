import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ['mui-tel-input'],
};

export default nextConfig;
