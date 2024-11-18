/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'luisdef.com',
        port: '',
        pathname: '/mm/img/**',
      },
      {
        protocol: 'http',
        hostname: 'luisdef.com',
        port: '',
        pathname: '/mm/img/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
