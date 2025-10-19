/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL || 'http',
        hostname: process.env.IMAGE_HOSTNAME || '127.0.0.1',
        port: process.env.IMAGE_PORT || '8000',
        pathname: process.env.IMAGE_PATHNAME || '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
