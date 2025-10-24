import type { NextConfig } from "next";

const protocol = (process.env.IMAGE_PROTOCOL ?? "https") as "http" | "https";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol,
        hostname: process.env.IMAGE_HOSTNAME ?? "mehrabfamily.ir",
        port: process.env.IMAGE_PORT ?? "",
        pathname: process.env.IMAGE_PATHNAME ?? "/upload/**",
      },
    ],
  },
};

export default nextConfig;
