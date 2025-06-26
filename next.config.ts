import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Existing domain
      },
      {
        protocol: 'https',
        hostname: "dummyimage.com", // Existing domain
      },
      {
        protocol: 'https',
        hostname: 'jaghufeohfcrwkhqisxt.supabase.co', // Add your Supabase domain
      },
      {
        protocol: "https",
        hostname: "example.com", // Add your image host here
        pathname: "/**", // Allow all images from this host
      },
    ],
    domains:["example.com", "pearlcity.com"], // Also add it here for compatibility
  },
};

export default nextConfig;
