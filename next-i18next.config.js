// next-i18next.config.js
const path = require('path');

module.exports = {
  i18n: {
    locales: [
      "en", "bn", "fr", "nl", "gu", "hi", "it", "ja", "ko",
      "pl", "pt", "ru", "es", "de"
    ],
    defaultLocale: "en",
    localeDetection: false, // ❌ auto / -> /en redirect বন্ধ
  },
  ns: ["common"],
  defaultNS: "common",
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
