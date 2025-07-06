import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  BellIcon,
  CreditCardIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface ProfileDropdownProps {
  user: User
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: t('profile.viewProfile'),
      href: '/profile'
    },
    {
      icon: <ChartBarIcon className="w-4 h-4" />,
      label: t('profile.accessDashboard'),
      href: '/dashboard'
    },
    {
      icon: <BellIcon className="w-4 h-4" />,
      label: t('notifications.title'),
      href: '/notifications'
    },
    {
      icon: <CreditCardIcon className="w-4 h-4" />,
      label: 'Facturation',
      href: '/billing'
    },
    {
      icon: <Cog6ToothIcon className="w-4 h-4" />,
      label: t('profile.settings'),
      href: '/settings'
    }
  ]

  const handleLogout = () => {
    // Logique de déconnexion
    console.log('Déconnexion...')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {user.role}
          </p>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50"
            >
              {/* User Info */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <p className="font-medium text-neutral-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 py-2">
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>{t('profile.logout')}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileDropdown 