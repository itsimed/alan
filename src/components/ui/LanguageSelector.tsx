import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { 
  LanguageIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
]

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode)
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        aria-label={t('language.selector')}
      >
        <LanguageIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:block text-sm font-medium text-neutral-900 dark:text-white">
          {currentLanguage.code.toUpperCase()}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        </motion.div>
      </motion.button>
      
      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-3 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
                  {t('language.selectLanguage')}
                </h3>
              </div>
              
              {/* Language Options */}
              <div className="py-2">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                      currentLanguage.code === language.code
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{language.flag}</span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                          {language.nativeName}
                        </div>
                      </div>
                    </div>
                    
                    {currentLanguage.code === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector 