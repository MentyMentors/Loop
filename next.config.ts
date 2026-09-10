import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This app is intentionally standalone: no rewrites/proxying into the
  // main mentorship platform. All cross-domain interaction happens strictly
  // through the shared auth cookie + JWT verification, never shared DB access.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
