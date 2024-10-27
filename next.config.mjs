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
        hostname: '172.27.218.2',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
