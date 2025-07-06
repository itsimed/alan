'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ClockIcon,
  StarIcon,
  PlayIcon 
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

interface LearningCardProps {
  course: {
    id: string
    title: string
    description: string
    duration: string
    difficulty: string
    rating: number
    studentsCount: number
    thumbnail: string
    instructor: string
    progress?: number
  }
}

const LearningCard: React.FC<LearningCardProps> = ({ course }) => {
  const { title, description, duration, difficulty, progress } = course

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow"
    >
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
        <PlayIcon className="w-16 h-16 text-primary-600 dark:text-primary-400" />
      </div>

      {/* Course Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/20 px-2 py-1 rounded">
            {difficulty}
          </span>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {course.rating}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {course.studentsCount} étudiants
          </span>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          icon={<PlayIcon className="w-4 h-4" />}
        >
          {progress ? 'Continuer' : 'Commencer'}
        </Button>
      </div>
    </motion.div>
  )
}

export default LearningCard 