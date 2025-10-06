const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,

  // i18n config — এখানে en prefix disable করা হয়েছে
  i18n: {
    locales: ['en', 'fr', 'de', 'es', 'bn'], // যেসব ভাষা সাপোর্ট করবে
    defaultLocale: 'en', // কিন্তু URL-এ prefix হবে না
    localeDetection: false,
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
