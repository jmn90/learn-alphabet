/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // domains: ["raw.githubusercontent.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
