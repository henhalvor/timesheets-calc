/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ymhmah4zzly0r63c.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
