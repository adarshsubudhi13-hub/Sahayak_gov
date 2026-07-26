import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Loads translations via http (async chunks)
  .use(LanguageDetector) // Detects user language automatically
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'hi', 'te'],
    fallbackLng: 'en',
    debug: false,
    
    // Add this detection configuration object
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'sahayak_lang', // Forces it to use your existing key
      caches: ['localStorage'],
    },
    
    // Path where the JSON chunks live
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    interpolation: {
      escapeValue: false, // React already safes from xss
    }
  });

export default i18n;
