const { NextI18Next } = require("next-i18next");
const path = require("path");

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: [
    "fr",   // French
    "nl",   // Dutch
    "gu",   // Gujarati
    "hi",   // Hindi
    "it",   // Italian
    "ja",   // Japanese
    "ko",   // Korean
    "pl",   // Polish
    "pt",   // Portuguese
    "ru",   // Russian
    "es",   // Spanish
    "de"    // German
  ],
  localePath: path.resolve("./public/locales"), // Path to locales folder
  ns: [
    "home",           // Default home page namespace
    "men",            // Namespace for men's content
    "navbar",         // Navigation bar translations
    "search",         // Search-related translations
    "footer",         // Footer translations
    "pricing",        // Pricing page translations
    "european",       // European-specific content
    "asian",          // Asian-specific content
    "australian",     // Australian-specific content
    "brazilian",      // Brazilian-specific content
    "canadian",       // Canadian-specific content
    "chinese",        // Chinese-specific content
    "colombian",      // Colombian-specific content
    "kids",           // Kids-specific content
    "men-to-women",   // Men's to women's size conversions
    "women",          // Women's-specific content
    "korean",         // Korean-specific content
    "mexican",        // Mexican-specific content
    "asos",           // Brand-specific translations
    "clarks"          // Brand-specific translations
  ], // List of namespaces
  defaultNS: "home",   // Default namespace
  fallbackNS: "home",  // Fallback namespace for missing translations
  fallbackLng: "en",   // Fallback language
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development environment
  detection: {
    order: ["cookie", "localStorage", "querystring", "path", "subdomain"],
    caches: ["cookie", "localStorage"]
  },
  interpolation: {
    escapeValue: false // React already escapes values by default
  }
});

module.exports = NextI18NextInstance;
module.exports.default = NextI18NextInstance;
