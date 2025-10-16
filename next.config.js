// next.config.js
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,

  // i18n config রাখতে হবে next-i18next এর জন্য
  i18n: {
    locales: ['en' ,'bn', 'fr', 'nl', 'gu', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'de'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // /en এবং /default redirect
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
     
    ];
  },

  async rewrites() {
    return [
      { source: '/uploads/:path*', destination: '/uploads/:path*' },
    ];
  },

  images: {
    domains: [
      'yt3.ggpht.com',
      'yt3.googleusercontent.com',
      'i.ytimg.com',
      'ytubetools.s3.eu-north-1.amazonaws.com',
      'shoesizeconvert.s3.amazonaws.com',
      'localhost',
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: { config: [__filename] },
      };
      config.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      };
    } else {
      config.cache = false;
    }
    return config;
  },
});
