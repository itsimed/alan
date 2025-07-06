import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface ProgressWidgetProps {
  title: string
  progress: number // 0-100
  total: number
  completed: number
  color?: 'primary' | 'green' | 'orange' | 'blue'
  showStats?: boolean
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  title,
  progress,
  total,
  completed,
  color = 'primary',
  showStats = true
}) => {
  const { t } = useTranslation()
  
  const colorClasses = {
    primary: 'bg-primary-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    blue: 'bg-blue-600'
  }
  
  const lightColorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/20',
    green: 'bg-green-100 dark:bg-green-900/20',
    orange: 'bg-orange-100 dark:bg-orange-900/20',
    blue: 'bg-blue-100 dark:bg-blue-900/20'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
          {title}
        </h4>
        <span className="text-2xl font-bold text-neutral-900 dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className={`w-full h-3 rounded-full ${lightColorClasses[color]}`}>
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      {/* Stats */}
      {showStats && (
        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <span>{completed} {t('common.completed')}</span>
          <span>{total - completed} {t('common.remaining')}</span>
        </div>
      )}
    </div>
  )
}

export default ProgressWidget 