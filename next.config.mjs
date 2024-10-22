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
    ],
  },
};

export default nextConfig;
