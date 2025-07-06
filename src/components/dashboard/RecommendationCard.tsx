import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

interface Recommendation {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  duration: string
  rating: number
  students: number
  thumbnail?: string
  reason: string
}

interface RecommendationCardProps {
  recommendation: Recommendation
  onStart?: (id: string) => void
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onStart
}) => {
  const { t } = useTranslation()
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
      case 'Intermédiaire':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
      case 'Avancé':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-900/20 dark:text-neutral-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20">
        {recommendation.thumbnail ? (
          <img 
            src={recommendation.thumbnail} 
            alt={recommendation.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-primary-600/20 dark:text-primary-400/20">
              {recommendation.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Recommendation reason */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {recommendation.reason}
          </span>
        </div>
        
        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(recommendation.difficulty)}`}>
            {recommendation.difficulty}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            {recommendation.category}
          </span>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mt-1 line-clamp-2">
            {recommendation.title}
          </h3>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
          {recommendation.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-4">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span>{recommendation.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{recommendation.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{recommendation.students}</span>
          </div>
        </div>
        
        {/* Action button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          icon={<ArrowRightIcon className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => onStart?.(recommendation.id)}
        >
          {t('dashboard.startCourse')}
        </Button>
      </div>
    </motion.div>
  )
}

export default RecommendationCard 