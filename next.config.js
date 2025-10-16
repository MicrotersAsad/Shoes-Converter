const { i18n } = require('./next-i18next.config');  // next-i18next কনফিগারেশনটি আমদানি করা হচ্ছে
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,

  // i18n কনফিগারেশনটি এখানে ব্যবহার করা হচ্ছে
  i18n: {
    locales: ['en', 'bn', 'fr', 'nl', 'gu', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'de'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // trailingSlash কনফিগারেশনটি এখানে থাকতে হবে
  trailingSlash: true,  // এটি এখানে ঠিক আছে

  // রিডিরেক্ট কনফিগারেশন
  async redirects() {
    return [
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // রাইট কনফিগারেশন
  async rewrites() {
    return [
      { source: '/uploads/:path*', destination: '/uploads/:path*' },
    ];
  },

  // চিত্রের জন্য ডোমেইন কনফিগারেশন
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

  // Webpack কনফিগারেশন
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
