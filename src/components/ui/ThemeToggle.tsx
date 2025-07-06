import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/useThemeStore'
import { 
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()
  
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      aria-label={t('theme.toggle')}
    >
      {/* Background circle */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-blue-600 dark:to-purple-600 opacity-0 hover:opacity-10 transition-opacity"
        animate={{
          opacity: isDark ? 0.1 : 0.1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon container */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SunIcon className="w-6 h-6 text-orange-500" />
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <MoonIcon className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isDark 
            ? '0 0 20px rgba(59, 130, 246, 0.3)' 
            : '0 0 20px rgba(249, 115, 22, 0.3)'
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: 'blur(8px)',
          opacity: 0.6
        }}
      />
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      </div>
    </motion.button>
  )
}

export default ThemeToggle 