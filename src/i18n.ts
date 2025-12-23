
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import LazyImportPlugin from './assets/languages/LazyImports';

i18n.use(LanguageDetector)
  .use(LazyImportPlugin)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['navigator'],
    },
    supportedLngs: ['es', 'en', 'ca'],
    nonExplicitSupportedLngs: true,
    fallbackLng: {
      'default': ['es']
    },
    interpolation: {
      escapeValue: false,
    },
    ns: ['landing'],
    saveMissing: true,
    missingKeyHandler: function (_lng, _ns, key) {
      console.log(key);
    }
  })

  export default i18n;