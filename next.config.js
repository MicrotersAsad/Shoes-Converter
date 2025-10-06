// next.config.js
const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,

  // i18n config
  i18n: {
    ...i18n,
    localeDetection: false, // আবারও নিশ্চিত করছি
  },

  // ❌ এখানে redirect দরকার নেই — middleware দিয়েই হবে
  async rewrites() {
    return [
      { source: "/uploads/:path*", destination: "/uploads/:path*" },
      // এখানে অন্য rewrite দরকার হলে যোগ করবে
    ];
  },

  images: {
    domains: [
      "yt3.ggpht.com",
      "yt3.googleusercontent.com",
      "i.ytimg.com",
      "ytubetools.s3.eu-north-1.amazonaws.com",
      "shoesizeconvert.s3.amazonaws.com",
      "localhost",
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = {
        type: "filesystem",
        buildDependencies: { config: [__filename] },
      };
      config.resolve.fallback = {
        fs: false,
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
      };
    } else {
      config.cache = false;
    }
    return config;
  },
});
