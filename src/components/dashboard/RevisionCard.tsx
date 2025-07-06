import React from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  QuestionMarkCircleIcon,
  CpuChipIcon,
  CodeBracketIcon,
  TrophyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { RevisionItem } from '@/lib/data/dashboard'

interface RevisionCardProps {
  revision: RevisionItem
  index: number
  onClick?: () => void
}

const RevisionCard: React.FC<RevisionCardProps> = ({ revision, index, onClick }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exercise':
        return <BookOpenIcon className="w-5 h-5" />
      case 'quiz':
        return <QuestionMarkCircleIcon className="w-5 h-5" />
      case 'challenge':
        return <CpuChipIcon className="w-5 h-5" />
      case 'project':
        return <CodeBracketIcon className="w-5 h-5" />
      default:
        return <BookOpenIcon className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exercise':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
      case 'quiz':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'challenge':
        return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20'
      case 'project':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20'
      default:
        return 'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-900/20'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'text-green-700 dark:text-green-300'
      case 'Intermédiaire':
        return 'text-blue-700 dark:text-blue-300'
      case 'Avancé':
        return 'text-orange-700 dark:text-orange-300'
      default:
        return 'text-neutral-700 dark:text-neutral-300'
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="relative p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 cursor-pointer hover:shadow-lg group"
    >
      {/* Need Review Indicator */}
      {revision.needsReview && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
            <ExclamationTriangleIcon className="w-3 h-3" />
            <span>À réviser</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className={`p-3 rounded-lg ${getTypeColor(revision.type)}`}>
          {getTypeIcon(revision.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {revision.title}
          </h3>
          <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
            <span className={getDifficultyColor(revision.difficulty)}>
              {revision.difficulty}
            </span>
            <span>•</span>
            <span>{revision.category}</span>
          </div>
        </div>
      </div>

      {/* XP and Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrophyIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-neutral-900 dark:text-white">
            +{revision.xpEarned} XP
          </span>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {formatTimeAgo(revision.completedAt)}
        </span>
      </div>

      {/* Type Badge */}
      <div className="mt-3">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
          {revision.type === 'exercise' && 'Exercice'}
          {revision.type === 'quiz' && 'Quiz'}
          {revision.type === 'challenge' && 'Défi'}
          {revision.type === 'project' && 'Projet'}
        </span>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </motion.div>
  )
}

export default RevisionCard