import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['m.media-amazon.com', "images-na.ssl-images-amazon.com"], // Add this line
  },
};

export default nextConfig;
