/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.gravatar.com"],
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
