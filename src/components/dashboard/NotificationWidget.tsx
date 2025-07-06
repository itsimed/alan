import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  BellIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

interface Notification {
  id: string
  type: 'reminder' | 'suggestion' | 'warning' | 'success'
  title: string
  message: string
  actionText?: string
  onAction?: () => void
  onDismiss?: () => void
  timestamp: string
}

interface NotificationWidgetProps {
  notifications: Notification[]
  onDismiss?: (id: string) => void
  onAction?: (id: string) => void
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({
  notifications,
  onDismiss,
  onAction
}) => {
  const { t } = useTranslation()
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
        return <BellIcon className="w-5 h-5" />
      case 'suggestion':
        return <LightBulbIcon className="w-5 h-5" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5" />
      case 'success':
        return <CheckCircleIcon className="w-5 h-5" />
      default:
        return <BellIcon className="w-5 h-5" />
    }
  }
  
  const getNotificationColors = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
      case 'suggestion':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
      case 'warning':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      case 'success':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      default:
        return 'text-neutral-600 bg-neutral-50 dark:bg-neutral-900/20'
    }
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
        <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>{t('dashboard.noNotifications')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`relative p-4 rounded-lg border ${getNotificationColors(notification.type)} border-current/20`}
        >
          {/* Dismiss button */}
          {onDismiss && (
            <button
              onClick={() => onDismiss(notification.id)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
          
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className={`flex-shrink-0 ${getNotificationColors(notification.type).split(' ')[0]}`}>
              {getNotificationIcon(notification.type)}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-neutral-900 dark:text-white mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {notification.message}
              </p>
              
              {/* Action and timestamp */}
              <div className="flex items-center justify-between">
                {notification.actionText && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAction?.(notification.id)}
                    className="text-xs"
                  >
                    {notification.actionText}
                  </Button>
                )}
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default NotificationWidget 