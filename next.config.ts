import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["mui-tel-input"],
};

export default nextConfig;
