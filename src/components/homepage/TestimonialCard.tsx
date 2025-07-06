'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { Testimonial } from '@/lib/data/testimonials'

interface TestimonialCardProps extends Testimonial {
  index?: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  content,
  rating,
  date,
  index = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
    >
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Content */}
      <blockquote className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
        "{content}"
      </blockquote>

      {/* User Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-neutral-900 dark:text-white">
            {name}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {role}
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">
        {new Date(date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </motion.div>
  )
}

export default TestimonialCard 