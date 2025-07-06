import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface ProgressChartProps {
  progress: number // 0-100
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'green' | 'orange' | 'blue'
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  progress,
  title,
  subtitle,
  size = 'md',
  color = 'primary'
}) => {
  const { t } = useTranslation()
  
  const sizeClasses = {
    sm: { container: 'w-24 h-24', text: 'text-lg', stroke: 4 },
    md: { container: 'w-32 h-32', text: 'text-xl', stroke: 6 },
    lg: { container: 'w-40 h-40', text: 'text-2xl', stroke: 8 }
  }
  
  const colorClasses = {
    primary: 'stroke-primary-600',
    green: 'stroke-green-600',
    orange: 'stroke-orange-600',
    blue: 'stroke-blue-600'
  }
  
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <svg 
          className={`${sizeClasses[size].container} transform -rotate-90`}
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={sizeClasses[size].stroke}
            fill="transparent"
            className="text-neutral-200 dark:text-neutral-700"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={sizeClasses[size].stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={colorClasses[color]}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className={`font-bold text-neutral-900 dark:text-white ${sizeClasses[size].text}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="font-semibold text-neutral-900 dark:text-white">
          {title}
        </h4>
        {subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProgressChart 