import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:
          (process.env.IMAGE_PROTOCOL as "http" | "https" | undefined) ||
          "https",
        hostname: process.env.IMAGE_HOSTNAME || "www.api.mehrabfamily.ir",
        port: process.env.IMAGE_PORT || "",
        pathname: process.env.IMAGE_PATHNAME || "/media/**",
      },
    ],
  },
};

export default nextConfig;
