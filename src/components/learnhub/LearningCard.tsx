'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Course } from '@/lib/data/learnhub'

interface LearningCardProps extends Course {
  index?: number
}

const LearningCard: React.FC<LearningCardProps> = ({
  title,
  description,
  progress,
  totalLessons,
  completedLessons,
  thumbnail,
  category,
  difficulty,
  estimatedTime,
  instructor,
  nextLesson,
  index = 0
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blue-600 dark:text-blue-400 text-3xl font-bold">
            {title.charAt(0)}
          </div>
        </div>
        
        {/* Play Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <PlayIcon className="w-12 h-12 text-white" />
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty === 'beginner' ? 'Débutant' : difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 p-2">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
          {category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          {description}
        </p>

        {/* Progress Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            {completedLessons}/{totalLessons} leçons
          </div>
          <div className="text-sm font-medium text-green-600 dark:text-green-400">
            {progress}%
          </div>
        </div>

        {/* Next Lesson */}
        {nextLesson && (
          <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3 mb-4">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              Prochaine leçon
            </div>
            <div className="text-sm font-medium text-neutral-900 dark:text-white">
              {nextLesson}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <ClockIcon className="w-4 h-4 mr-1" />
            {estimatedTime}
          </div>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
            Continuer
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default LearningCard 