import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrophyIcon,
  ArrowUpIcon,
  FireIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { RankingData } from '@/lib/data/dashboard'
import Button from '@/components/ui/Button'

interface RankingCardProps {
  ranking: RankingData
  onViewLeaderboard?: () => void
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking, onViewLeaderboard }) => {
  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'Bronze':
        return 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/20'
      case 'Argent':
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900/20'
      case 'Or':
        return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/20'
      case 'Platine':
        return 'text-cyan-700 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-900/20'
      case 'Diamant':
        return 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/20'
      default:
        return 'text-neutral-700 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-900/20'
    }
  }

  const getLeagueIcon = (league: string) => {
    switch (league) {
      case 'Bronze':
        return '🥉'
      case 'Argent':
        return '🥈'
      case 'Or':
        return '🥇'
      case 'Platine':
        return '💎'
      case 'Diamant':
        return '💠'
      default:
        return '🏆'
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
            <TrophyIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              Classement
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Cette semaine
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getLeagueColor(ranking.league)}`}>
            <span>{getLeagueIcon(ranking.league)}</span>
            <span>Ligue {ranking.league}</span>
          </div>
        </div>
      </div>

      {/* Current Rank */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-3xl font-bold text-neutral-900 dark:text-white">
            #{formatNumber(ranking.currentRank)}
          </span>
          <ArrowUpIcon className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          sur {formatNumber(ranking.totalUsers)} participants
        </p>
      </div>

      {/* XP This Week */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FireIcon className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              XP cette semaine
            </span>
          </div>
          <span className="text-sm font-bold text-neutral-900 dark:text-white">
            {formatNumber(ranking.xpThisWeek)} XP
          </span>
        </div>
        
        {/* Progress to Next Rank */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>Prochain rang</span>
            <span>{formatNumber(ranking.xpToNextRank)} XP restants</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ranking.rankProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onViewLeaderboard}
        variant="outline"
        size="sm"
        className="w-full"
        icon={<UsersIcon className="w-4 h-4" />}
      >
        Voir le classement
      </Button>

      {/* Achievement Hint */}
      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <p className="text-xs text-primary-700 dark:text-primary-300 text-center">
          💡 Continuez vos efforts pour atteindre la ligue Platine !
        </p>
      </div>
    </motion.div>
  )
}

export default RankingCard