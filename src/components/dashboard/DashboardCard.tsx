import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface DashboardCardProps {
  title: string
  value?: string | number
  children?: React.ReactNode
  icon?: React.ReactNode
  trend?: string
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  className?: string
  gradient?: boolean
  hover?: boolean
  onClick?: () => void
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  children,
  icon,
  trend,
  color = 'blue',
  className,
  gradient = false,
  hover = true,
  onClick
}) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      onClick={onClick}
      className={clsx(
        'relative overflow-hidden rounded-xl border border-neutral-200/50 dark:border-neutral-700/50',
        'bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80',
        'shadow-lg hover:shadow-xl transition-all duration-300',
        gradient && 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {title}
          </h3>
          {icon && (
            <div className={colorClasses[color]}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Content */}
        {value && (
          <div className="mb-2">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
              {value}
            </div>
            {trend && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {trend}
              </div>
            )}
          </div>
        )}
        
        {children && (
          <div className="text-neutral-600 dark:text-neutral-300">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DashboardCard 