// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend"; // For loading translations from the server

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
<<<<<<< HEAD
    fallbackLng: "en", // Default language
    debug: true, // Set to false in production
=======
    fallbackLng: "en", // Fallback language
    supportedLngs: ["en", "ar"], // Supported languages
    debug: isDevelopment, // Enable debug in development only
>>>>>>> prod-env
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
<<<<<<< HEAD
      loadPath: `${import.meta.env.VITE_API_URL}/locales/{{lng}}/{{ns}}.json`, // Translation file path
=======
      loadPath: isDevelopment
        ? "http://localhost:3000/locales/{{lng}}/{{ns}}.json" // Local path for development
        : "https://www.edulibya.ly/locales/{{lng}}/{{ns}}.json", // Full URL for production
    },
    cache: {
      enabled: !isDevelopment, // Disable cache in development, enable in production
>>>>>>> prod-env
    },
  });

export default i18n;
