'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { StarIcon, PlayIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { Product } from '@/lib/data/products'

interface ProductCardProps extends Product {
  onAddToCart?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  originalPrice,
  category,
  level,
  duration,
  rating,
  reviewCount,
  instructor,
  thumbnail,
  tags,
  isLive,
  students,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    onAddToCart?.(id)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggleFavorite?.(id)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Débutant'
      case 'intermediate':
        return 'Intermédiaire'
      case 'advanced':
        return 'Avancé'
      default:
        return level
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
            {title.charAt(0)}
          </div>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
            LIVE
          </div>
        )}

        {/* Level Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
          {getLevelText(level)}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute bottom-3 right-3 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full hover:bg-white dark:hover:bg-neutral-700 transition-colors duration-200"
        >
          {isFavorite ? (
            <HeartIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutlineIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>

        {/* Play Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <PlayIcon className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
          {category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
            {instructor.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {instructor.name}
              </span>
              {instructor.verified && (
                <CheckBadgeIcon className="w-4 h-4 text-blue-500 ml-1" />
              )}
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
            {rating} ({reviewCount})
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-auto">
            {students.toLocaleString()} étudiants
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              €{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                €{originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {duration}
            </span>
          </div>
        </div>

        {/* Buy Button - Appears on Hover */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          onClick={handleAddToCart}
          className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Ajouter au panier
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard 