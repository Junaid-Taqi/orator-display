import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './translations/en.json';
import translationUR from './translations/ur.json';
import translationAR from './translations/ar.json';

// Setup translations
const resources = {
    en: {
        translation: translationEN,
    },
    ur: {
        translation: translationUR,
    },
    ar: {
        translation: translationAR,
    },
};

// Initialize i18next
i18n
    .use(LanguageDetector) // Automatically detect the user's language
    .use(initReactI18next) // Passes i18n instance to react-i18next
    .init({
        resources,
        fallbackLng: 'en', // Fallback language is English
        interpolation: {
            escapeValue: false, // React already protects from XSS
        },
    });

export default i18n;
