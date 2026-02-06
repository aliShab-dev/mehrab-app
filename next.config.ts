import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mehrabfamily.ir",
        pathname: "/media/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/uploads/**",
      },
    ],
  },
};

export default nextConfig;
