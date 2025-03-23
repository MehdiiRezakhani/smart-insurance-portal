import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/fa/translation.json';

// Map of languages to their RTL status
export const RTL_LANGUAGES = ['fa'];

// Function to check if a language is RTL
export const isRTL = (language: string): boolean => {
  return RTL_LANGUAGES.includes(language);
};

const resources = {
  en: {
    translation: enTranslation
  },
  fa: {
    translation: faTranslation
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.MODE === 'development',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n; 