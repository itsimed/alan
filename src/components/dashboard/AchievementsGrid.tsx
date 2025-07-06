import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrophyIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { Achievement } from '@/lib/data/dashboard'
import Button from '@/components/ui/Button'

interface AchievementsGridProps {
  achievements: Achievement[]
  onViewAll?: () => void
}

const AchievementsGrid: React.FC<AchievementsGridProps> = ({ achievements, onViewAll }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 dark:bg-gray-900/20 border-gray-300 dark:border-gray-600'
      case 'rare':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
      case 'epic':
        return 'bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600'
      case 'legendary':
        return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600'
      default:
        return 'bg-neutral-100 dark:bg-neutral-900/20 border-neutral-300 dark:border-neutral-600'
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return 'shadow-blue-500/20'
      case 'epic':
        return 'shadow-purple-500/20'
      case 'legendary':
        return 'shadow-yellow-500/30'
      default:
        return ''
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return "Aujourd'hui"
    if (days === 1) return 'Hier'
    return `Il y a ${days} jours`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
            <TrophyIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              Réalisations récentes
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {achievements.length} nouvelles récompenses
            </p>
          </div>
        </div>
        <Button
          onClick={onViewAll}
          variant="ghost"
          size="sm"
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          Voir tout
        </Button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)}`}
          >
            {/* Rarity Indicator */}
            {achievement.rarity !== 'common' && (
              <div className="absolute top-2 right-2">
                <SparklesIcon className="w-4 h-4 text-yellow-500" />
              </div>
            )}

            {/* Icon and Title */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-neutral-900 dark:text-white text-sm leading-tight">
                  {achievement.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                  {achievement.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="w-3 h-3 text-yellow-500" />
                <span className="font-medium text-neutral-900 dark:text-white">
                  +{achievement.xpReward} XP
                </span>
              </div>
              <span className="text-neutral-500 dark:text-neutral-400">
                {formatTimeAgo(achievement.unlockedAt)}
              </span>
            </div>

            {/* Legendary Glow Effect */}
            {achievement.rarity === 'legendary' && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievement Progress Hint */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
              Prochaine réalisation disponible
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              "Série de 14 jours" - Continuez votre apprentissage quotidien !
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AchievementsGrid