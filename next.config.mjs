/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '' },
      { protocol: 'http', hostname: '127.0.0.1', port: '' },
      { protocol: 'https', hostname: 'afrovivehealth.org' }
    ]
  }
};

export default nextConfig;
