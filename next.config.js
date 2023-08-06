/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gravatar.com"],
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
