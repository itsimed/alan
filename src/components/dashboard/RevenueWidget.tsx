import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyEuroIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface RevenueData {
  total: number
  monthly: number
  weekly: number
  growth: number
  trend: 'up' | 'down' | 'stable'
  sources: {
    courses: number
    products: number
    investments: number
  }
}

interface RevenueWidgetProps {
  data: RevenueData
  currency?: string
}

const RevenueWidget: React.FC<RevenueWidgetProps> = ({
  data,
  currency = '€'
}) => {
  const { t } = useTranslation()
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4 bg-neutral-400 rounded-full"></div>
    }
  }
  
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
  }
  
  const totalSources = data.sources.courses + data.sources.products + data.sources.investments
  const getPercentage = (value: number) => Math.round((value / totalSources) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {t('dashboard.estimatedRevenue')}
        </h3>
        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
          <EyeIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>
      
      {/* Main revenue display */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <span className="text-3xl font-bold text-neutral-900 dark:text-white">
            {formatCurrency(data.total)}
          </span>
        </motion.div>
        <div className="flex items-center justify-center space-x-2">
          {getTrendIcon(data.trend)}
          <span className={`text-sm font-medium ${getTrendColor(data.trend)}`}>
            {data.growth > 0 ? '+' : ''}{data.growth}% {t('dashboard.thisMonth')}
          </span>
        </div>
      </div>
      
      {/* Period breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
        >
          <div className="text-lg font-semibold text-neutral-900 dark:text-white">
            {formatCurrency(data.monthly)}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {t('dashboard.thisMonth')}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center"
        >
          <div className="text-lg font-semibold text-neutral-900 dark:text-white">
            {formatCurrency(data.weekly)}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {t('dashboard.thisWeek')}
          </div>
        </motion.div>
      </div>
      
      {/* Revenue sources */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('dashboard.revenueSources')}
        </h4>
        
        <div className="space-y-3">
          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('dashboard.courses')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {formatCurrency(data.sources.courses)}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {getPercentage(data.sources.courses)}%
              </span>
            </div>
          </motion.div>
          
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('dashboard.products')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {formatCurrency(data.sources.products)}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {getPercentage(data.sources.products)}%
              </span>
            </div>
          </motion.div>
          
          {/* Investments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('dashboard.investments')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {formatCurrency(data.sources.investments)}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {getPercentage(data.sources.investments)}%
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Visual progress bars */}
        <div className="space-y-2 mt-4">
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getPercentage(data.sources.courses)}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <motion.div
              className="bg-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getPercentage(data.sources.products)}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <motion.div
              className="bg-orange-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getPercentage(data.sources.investments)}%` }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueWidget 