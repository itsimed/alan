import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon,
  SparklesIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { MAIN_NAVIGATION } from '@/lib/routes'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageSelector from '@/components/ui/LanguageSelector'
import NotificationDropdown from '@/components/ui/NotificationDropdown'
import ProfileMenu from '@/components/ui/ProfileMenu'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Effet de scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-lg shadow-neutral-900/5 dark:shadow-neutral-900/20 border-b border-neutral-200/50 dark:border-neutral-700/50' 
          : 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/30 dark:border-neutral-700/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo avec image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link to="/home" className="flex items-center space-x-3 group">
              <img src="/logo.png" alt="Ayan Bridge Logo" className="w-12 h-12 object-contain rounded-xl shadow-lg" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Ayan Bridge
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1">
                  Intelligence créative
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Desktop avec indicateur de progression */}
          <nav className="hidden lg:flex items-center space-x-1">
            {MAIN_NAVIGATION.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  {t(item.label)}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-2">
            {/* Contrôles */}
            <div className="flex items-center space-x-1">
              {/* Theme Toggle avec animation */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ThemeToggle />
              </motion.div>

              {/* Language Selector avec animation */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <LanguageSelector />
              </motion.div>

              {/* Notifications avec badge animé */}
              {isAuthenticated && (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <NotificationDropdown />
                </motion.div>
              )}

              {/* Profile Menu avec avatar animé */}
              {isAuthenticated && (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <ProfileMenu userName={user?.name || 'Utilisateur'} />
                </motion.div>
              )}

              {/* Bouton mobile avec animation */}
              <motion.div 
                className="lg:hidden"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Bars3Icon className="w-5 h-5" />}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile avec animations améliorées */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200/50 dark:border-neutral-700/50"
          >
            <div className="px-4 py-3 space-y-1">
              {MAIN_NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 shadow-sm'
                        : 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                </motion.div>
              ))}
              
              {/* Lien profil mobile */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: MAIN_NAVIGATION.length * 0.05 }}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-800 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mon Profil
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header 