import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['mui-tel-input'],
};

export default nextConfig;
