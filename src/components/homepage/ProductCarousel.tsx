'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { PlayIcon } from '@heroicons/react/24/outline'
import { products } from '@/lib/data/products'

const ProductCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const visibleProducts = products.slice(0, 6) // Show first 6 products

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="relative">
      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                <div className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
                  {product.title.charAt(0)}
                </div>
              </div>
              {product.isLive && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <PlayIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
                  ({product.reviewCount})
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                {product.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    €{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      €{product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {product.duration}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                  <div className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
                    {visibleProducts[currentIndex]?.title.charAt(0)}
                  </div>
                </div>
                {visibleProducts[currentIndex]?.isLive && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(visibleProducts[currentIndex]?.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
                    ({visibleProducts[currentIndex]?.reviewCount})
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {visibleProducts[currentIndex]?.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {visibleProducts[currentIndex]?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      €{visibleProducts[currentIndex]?.price}
                    </span>
                    {visibleProducts[currentIndex]?.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        €{visibleProducts[currentIndex]?.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {visibleProducts[currentIndex]?.duration}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ChevronLeftIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ChevronRightIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {visibleProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 dark:bg-primary-400'
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel 