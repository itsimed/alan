import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface DashboardCardProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  gradient?: boolean
  hover?: boolean
  onClick?: () => void
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  icon,
  className,
  gradient = false,
  hover = true,
  onClick
}) => {
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
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          {icon && (
            <div className="text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="text-neutral-600 dark:text-neutral-300">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardCard 