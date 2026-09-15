/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // CMS image URLs are served by Laravel/Hostinger. Do not route them
    // through Next's /_next/image optimizer, which rejects some production
    // storage URLs and produces INVALID_IMAGE_OPTIMIZE_REQUEST responses.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '' },
      { protocol: 'http', hostname: '127.0.0.1', port: '' },
      { protocol: 'https', hostname: 'afrovivehealth.org' }
    ]
  }
};

export default nextConfig;
