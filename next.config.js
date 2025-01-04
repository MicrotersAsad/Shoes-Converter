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
    // Dynamic rewrites for countries and brands
    const countries = [
      'japanese',
      'korean',
      'spanish',
      'french',
      'german',
      'italian',
      'russian',
      'chinese',
    ]; // List of countries

    const brands = [
      'adidas',
      'nike',
      'puma',
      'clarks',
      'asos',
      'merrell',
      'shein',
    ]; // List of brands

    // Generate country rewrites
    const countryRewrites = countries.flatMap((country) => [
      { source: `/country/${country}`, destination: `/en/country/${country}` },
      { source: `/country/${country}`, destination: `/fr/country/${country}` },
      { source: `/country/${country}`, destination: `/de/country/${country}` },
    ]);

    // Generate brand rewrites
    const brandRewrites = brands.flatMap((brand) => [
      { source: `/brand/${brand}`, destination: `/en/brand/${brand}` },
      { source: `/brand/${brand}`, destination: `/fr/brand/${brand}` },
      { source: `/brand/${brand}`, destination: `/de/brand/${brand}` },
    ]);

    // Include any existing rewrites
    const existingRewrites = [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*', // Directly serve from public folder
      },
    ];

    // Combine all rewrites
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
