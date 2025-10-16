const crypto = require("crypto");

/** @type {import('next').NextConfig} */
module.exports = async () => {
  const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ["@repo/ui"],

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.byte24.nl",
        },
        {
          protocol: "https",
          hostname: "byte24.app",
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "https",
          hostname: "d4wl4pw984ox6.cloudfront.net",
        },
        {
          protocol: "https",
          hostname: "d389mt1g3b5tq.cloudfront.net",
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/backend/:path*",
          destination: `${process.env.BACKEND_URL}/:path*`,
        },
      ];
    },
  };

  const revision = crypto.randomUUID();
  const withSerwist = (await import("@serwist/next")).default({
    swSrc: "sw.ts",
    swDest: "public/sw.js",
    reloadOnOnline: false,
    cacheOnNavigation: true,
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
  });

  return withSerwist(nextConfig);
};
