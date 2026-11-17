import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    /*
     * Neon Object Storage serves public_read objects from a branch-scoped
     * host, so the branch id is wildcarded: a preview branch serves its own
     * copy of each object from its own subdomain. Without this entry,
     * next/image refuses the URL outright.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.storage.c-8.us-east-2.aws.neon.tech",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
