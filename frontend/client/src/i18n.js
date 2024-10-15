import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const isDevelopment = import.meta.env.MODE === "development"; // Check if it's in development mode

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Fallback language
    supportedLngs: ["en", "ar"], // Supported languages
    debug: isDevelopment, // Enable debug in development only
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: isDevelopment
        ? "http://localhost:3000/locales/{{lng}}/{{ns}}.json" // Local path for development
        : "https://www.edulibya.ly/locales/{{lng}}/{{ns}}.json", // Full URL for production
    },
    cache: {
      enabled: !isDevelopment, // Disable cache in development, enable in production
    },
  });

export default i18n;
