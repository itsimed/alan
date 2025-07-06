'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon, 
  ClockIcon, 
  TrophyIcon, 
  FireIcon 
} from '@heroicons/react/24/outline'

const DashboardProgress: React.FC = () => {
  const stats = [
    {
      title: 'Cours en cours',
      value: '4',
      icon: BookOpenIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      title: 'Heures d\'étude',
      value: '127h',
      icon: ClockIcon,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      title: 'Badges obtenus',
      value: '8',
      icon: TrophyIcon,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    },
    {
      title: 'Série actuelle',
      value: '12 jours',
      icon: FireIcon,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900'
    }
  ]

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Votre progression
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {stat.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Objectif mensuel
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              75%
            </span>
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Certification en cours
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              60%
            </span>
          </div>
          <div className="bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bg-green-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProgress 