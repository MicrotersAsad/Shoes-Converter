const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // Enables bundle analysis when ANALYZE is set to true
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true, // Strict mode to help identify potential issues in the app
  i18n, // i18n configuration for language support
  swcMinify: true, // Enables minification using SWC (faster and more optimized)
  trailingSlash: false, // Ensures URL's trailing slashes are not included by default
 
  async rewrites() {
    const countries = [
      'japanese', 'korean', 'spanish', 'french', 'german', 'italian', 'russian', 'chinese',
    ];
    const brands = [
      'adidas', 'nike', 'puma', 'clarks', 'asos', 'merrell', 'shein',
    ];
    const locales = [
      'en', 'fr', 'nl', 'gu', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'de',
    ];
  
    // Generate country rewrites
    const countryRewrites = countries.flatMap((country) =>
      locales.map((locale) => ({
        source: `/country/${country}`,
        destination: `/${locale}/country/${country}`,
      }))
    );
  
    // Generate brand rewrites
    const brandRewrites = brands.flatMap((brand) =>
      locales.map((locale) => ({
        source: `/brand/${brand}`,
        destination: `/${locale}/brand/${brand}`,
      }))
    );
  
    const existingRewrites = [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  
    return [...existingRewrites, ...countryRewrites, ...brandRewrites];
  },

  images: {
    domains: [
      'yt3.ggpht.com', // Add all image domains you need to optimize and serve
      'yt3.googleusercontent.com',
      'i.ytimg.com',
      'ytubetools.s3.eu-north-1.amazonaws.com',
     'shoesizeconvert.s3.amazonaws.com',
      'localhost'
    ],
  },

  webpack: (config, { isServer }) => {
    // Disable filesystem caching on serverless environments
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename], // Enable cache for faster builds
        },
      };
      config.resolve.fallback = {
        fs: false, // Disable fs in browser
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      };
    } else {
      config.cache = false; // Disable caching for serverless environment to avoid issues
    }

    return config;
  },
});
