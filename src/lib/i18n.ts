import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import des traductions
import fr from '@locales/fr.json'
import en from '@locales/en.json'
import ar from '@locales/ar.json'

const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
}

// Configuration RTL
const rtlLanguages = ['ar']

const updateDocumentDirection = (language: string) => {
  const isRTL = rtlLanguages.includes(language)
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  document.documentElement.lang = language
  
  // Ajouter/retirer classe RTL pour Tailwind
  if (isRTL) {
    document.documentElement.classList.add('rtl')
  } else {
    document.documentElement.classList.remove('rtl')
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  })

// Mettre à jour la direction au changement de langue
i18n.on('languageChanged', (language) => {
  updateDocumentDirection(language)
})

// Initialiser la direction au chargement
updateDocumentDirection(i18n.language)

export default i18n 