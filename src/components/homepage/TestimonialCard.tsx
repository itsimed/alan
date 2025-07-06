'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    role: string
    content: string
    rating: number
    avatar: string
    date?: string
  }
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, role, content, rating, date } = testimonial

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700"
    >
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-neutral-300 dark:text-neutral-600'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-neutral-700 dark:text-neutral-300 mb-6">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-full flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">
              {name}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {role}
            </p>
          </div>
        </div>
        {date && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {new Date(date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default TestimonialCard 