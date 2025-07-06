import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  BellIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: string
  type: 'course' | 'revenue' | 'live' | 'system' | 'reminder'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

interface NotificationBellProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onNotificationClick?: (notification: Notification) => void
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'course':
        return <LightBulbIcon className="w-4 h-4 text-blue-600" />
      case 'revenue':
        return <CheckIcon className="w-4 h-4 text-green-600" />
      case 'live':
        return <ClockIcon className="w-4 h-4 text-red-600" />
      case 'system':
        return <ExclamationTriangleIcon className="w-4 h-4 text-orange-600" />
      case 'reminder':
        return <ClockIcon className="w-4 h-4 text-purple-600" />
      default:
        return <BellIcon className="w-4 h-4 text-neutral-600" />
    }
  }
  
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'course':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'revenue':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'live':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'system':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 'reminder':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
      default:
        return 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
    }
  }
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return t('notifications.justNow')
    if (diffInMinutes < 60) return t('notifications.minutesAgo', { count: diffInMinutes })
    if (diffInMinutes < 1440) return t('notifications.hoursAgo', { count: Math.floor(diffInMinutes / 60) })
    return t('notifications.daysAgo', { count: Math.floor(diffInMinutes / 1440) })
  }
  
  const groupedNotifications = notifications.reduce((groups, notification) => {
    if (!groups[notification.type]) {
      groups[notification.type] = []
    }
    groups[notification.type].push(notification)
    return groups
  }, {} as Record<string, Notification[]>)

  return (
    <div className="relative">
      {/* Bell Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        <BellIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        
        {/* Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
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
            
            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 max-h-96 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {t('notifications.title')}
                </h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllAsRead}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      {t('notifications.markAllRead')}
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
              </div>
              
              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                    <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{t('notifications.noNotifications')}</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {Object.entries(groupedNotifications).map(([type, typeNotifications]) => (
                      <div key={type} className="mb-4">
                        {/* Category Header */}
                        <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                          {getNotificationIcon(type as Notification['type'])}
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
                            {t(`notifications.categories.${type}`)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            ({typeNotifications.length})
                          </span>
                        </div>
                        
                        {/* Notifications in this category */}
                        <div className="space-y-1">
                          {typeNotifications.map((notification, index) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              onClick={() => {
                                onNotificationClick?.(notification)
                                if (!notification.read) {
                                  onMarkAsRead?.(notification.id)
                                }
                              }}
                              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md border ${
                                notification.read 
                                  ? 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 opacity-75' 
                                  : getNotificationColor(notification.type)
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                                    )}
                                    <h4 className="font-medium text-neutral-900 dark:text-white truncate">
                                      {notification.title}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                                
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      onMarkAsRead?.(notification.id)
                                    }}
                                    className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors ml-2"
                                  >
                                    <CheckIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    {t('notifications.viewAll')}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationBell 