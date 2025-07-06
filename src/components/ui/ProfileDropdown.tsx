import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { 
  UserIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

interface ProfileDropdownProps {
  user: User
  onLogout?: () => void
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const menuItems = [
    {
      id: 'profile',
      label: t('profile.viewProfile'),
      icon: <UserCircleIcon className="w-4 h-4" />,
      action: () => navigate('/profile')
    },
    {
      id: 'dashboard',
      label: t('profile.accessDashboard'),
      icon: <ChartBarIcon className="w-4 h-4" />,
      action: () => navigate('/dashboard')
    },
    {
      id: 'settings',
      label: t('profile.settings'),
      icon: <Cog6ToothIcon className="w-4 h-4" />,
      action: () => navigate('/settings')
    },
    {
      id: 'logout',
      label: t('profile.logout'),
      icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
      action: onLogout,
      variant: 'danger' as const
    }
  ]

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-600"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(user.name)}
            </div>
          )}
          
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
        </div>
        
        {/* User info */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-neutral-900 dark:text-white">
            {user.name}
          </div>
          {user.role && (
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {user.role}
            </div>
          )}
        </div>
        
        {/* Chevron */}
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
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 dark:text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => {
                      item.action?.()
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      item.variant === 'danger'
                        ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white'
                    }`}
                  >
                    <div className={`${
                      item.variant === 'danger' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
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

export default ProfileDropdown 