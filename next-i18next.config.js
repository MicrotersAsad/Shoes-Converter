// next-i18next.config.js
const path = require('path');

module.exports = {
  i18n: {
    // 'en' এর বদলে 'default' ব্যবহার করুন
    locales: ['default', 'bn', 'fr', 'nl', 'gu', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'de'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  ns: ['common'],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};