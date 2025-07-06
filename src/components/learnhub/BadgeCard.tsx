'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/lib/data/learnhub'

interface BadgeCardProps extends Badge {
  index?: number
}

const BadgeCard: React.FC<BadgeCardProps> = ({
  name,
  description,
  icon,
  color,
  earnedAt,
  rarity,
  index = 0
}) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 dark:border-gray-600'
      case 'rare':
        return 'border-blue-300 dark:border-blue-600'
      case 'epic':
        return 'border-purple-300 dark:border-purple-600'
      case 'legendary':
        return 'border-yellow-300 dark:border-yellow-600'
      default:
        return 'border-gray-300 dark:border-gray-600'
    }
  }

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'Commun'
      case 'rare':
        return 'Rare'
      case 'epic':
        return 'Épique'
      case 'legendary':
        return 'Légendaire'
      default:
        return rarity
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border-2 ${getRarityColor(rarity)} relative overflow-hidden`}
    >
      {/* Rarity Indicator */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
        rarity === 'common' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' :
        rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
        rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        {getRarityText(rarity)}
      </div>

      {/* Badge Icon */}
      <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-3 text-2xl`}>
        {icon}
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
          {name}
        </h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
          {description}
        </p>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Obtenu le {new Date(earnedAt).toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Shine Effect for Legendary */}
      {rarity === 'legendary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent transform -skew-x-12 animate-pulse" />
      )}
    </motion.div>
  )
}

export default BadgeCard 