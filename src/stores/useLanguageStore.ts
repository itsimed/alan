import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@lib/i18n'

type Language = 'fr' | 'en' | 'ar'

interface LanguageState {
  currentLanguage: Language
  direction: 'ltr' | 'rtl'
  
  // Actions
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const languageConfig = {
  fr: { direction: 'ltr' as const },
  en: { direction: 'ltr' as const },
  ar: { direction: 'rtl' as const },
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'fr',
      direction: 'ltr',

      setLanguage: (language: Language) => {
        i18n.changeLanguage(language)
        const config = languageConfig[language]
        
        set({
          currentLanguage: language,
          direction: config.direction,
        })
        
        // Mettre à jour la direction du document
        document.documentElement.dir = config.direction
        document.documentElement.lang = language
      },

      toggleLanguage: () => {
        const { currentLanguage } = get()
        const languages: Language[] = ['fr', 'en', 'ar']
        const currentIndex = languages.indexOf(currentLanguage)
        const nextIndex = (currentIndex + 1) % languages.length
        const nextLanguage = languages[nextIndex]
        
        get().setLanguage(nextLanguage)
      },
    }),
    {
      name: 'ayan-language-storage',
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        direction: state.direction,
      }),
    }
  )
) 