/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.gravatar.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
