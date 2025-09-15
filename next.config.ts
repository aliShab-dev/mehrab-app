import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:
          (process.env.IMAGE_PROTOCOL as "http" | "https" | undefined) ||
          "http",
        hostname: process.env.IMAGE_HOSTNAME || "127.0.0.1",
        port: process.env.IMAGE_PORT || "8000",
        pathname: process.env.IMAGE_PATHNAME || "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
