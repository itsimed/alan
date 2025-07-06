'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '@/lib/data/products'

interface InfiniteGridProps {
  searchQuery?: string
  filters?: any
}

const InfiniteGrid: React.FC<InfiniteGridProps> = ({
  searchQuery = '',
  filters
}) => {
  const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 6))
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = displayedProducts.length
      const nextProducts = products.slice(currentLength, currentLength + 6)
      
      if (nextProducts.length === 0) {
        setHasMore(false)
      } else {
        setDisplayedProducts(prev => [...prev, ...nextProducts])
      }
      
      setIsLoading(false)
    }, 1000)
  }, [displayedProducts.length, isLoading, hasMore])

  // Filter products based on search and filters
  const filteredProducts = displayedProducts.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.instructor.name.toLowerCase().includes(query)
      
      if (!matchesSearch) return false
    }

    // Additional filters can be applied here based on the filters prop
    
    return true
  })

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMoreProducts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreProducts])

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId)
    // Here you would typically dispatch to a cart store
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les cours'}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {filteredProducts.length} cours trouvés
          </p>
        </div>
        
        {/* Sort Options */}
        <select className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm">
          <option value="relevance">Pertinence</option>
          <option value="newest">Plus récent</option>
          <option value="rating">Mieux notés</option>
          <option value="price-low">Prix croissant</option>
          <option value="price-high">Prix décroissant</option>
          <option value="popular">Popularité</option>
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard
                {...product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
            Aucun cours trouvé
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-neutral-600 dark:text-neutral-400">
            Chargement des cours...
          </span>
        </div>
      )}

      {/* Load More Button (fallback for infinite scroll) */}
      {!isLoading && hasMore && filteredProducts.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreProducts}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Charger plus de cours
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && filteredProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-600 dark:text-neutral-400">
            Vous avez vu tous les cours disponibles.
          </p>
        </div>
      )}
    </div>
  )
}

export default InfiniteGrid 