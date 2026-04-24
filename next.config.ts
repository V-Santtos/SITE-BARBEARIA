import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
  },
  allowedDevOrigins: ["192.168.1.5"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
