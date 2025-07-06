import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon
} from '@heroicons/react/24/outline'
import { MAIN_NAVIGATION } from '@/lib/routes'
import Button from '@/components/ui/Button'
import NotificationBell from '@/components/ui/NotificationBell'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
import LanguageSelector from '@/components/ui/LanguageSelector'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { notifications, currentUser } from '@/lib/data/dashboardData'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const handleNotificationClick = (notification: any) => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  const handleLogout = () => {
    // Logique de déconnexion
    console.log('Déconnexion...')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">A</span>
            </motion.div>
            <span className="text-xl font-bold text-neutral-900 dark:text-white">
              Ayan Bridge
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {MAIN_NAVIGATION.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === item.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                  }`}
                >
                  {t(item.label)}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <NotificationBell
              notifications={notificationList}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onNotificationClick={handleNotificationClick}
            />

            {/* Profile Dropdown */}
            <ProfileDropdown
              user={currentUser}
              onLogout={handleLogout}
            />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                icon={isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700"
          >
            <div className="px-4 py-4 space-y-2">
              {MAIN_NAVIGATION.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {t(item.label)}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {t('common.preferences')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 