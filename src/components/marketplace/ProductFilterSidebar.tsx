'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { categories, levels } from '@/lib/data/products'

interface FilterState {
  categories: string[]
  levels: string[]
  priceRange: [number, number]
  rating: number
  duration: string[]
  language: string[]
}

interface ProductFilterSidebarProps {
  onFiltersChange?: (filters: FilterState) => void
  className?: string
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  onFiltersChange,
  className
}) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    levels: [],
    priceRange: [0, 500],
    rating: 0,
    duration: [],
    language: []
  })

  const [isOpen, setIsOpen] = useState(false)

  const durations = ['< 5h', '5-10h', '10-20h', '> 20h']
  const languages = ['Français', 'Anglais', 'Arabe']

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const toggleArrayFilter = (key: 'categories' | 'levels' | 'duration' | 'language', value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      levels: [],
      priceRange: [0, 500],
      rating: 0,
      duration: [],
      language: []
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">{title}</h3>
      {children}
    </div>
  )

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FunnelIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mr-2" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Filtres</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          Effacer tout
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Catégories">
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleArrayFilter('categories', category)}
                className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Levels */}
      <FilterSection title="Niveau">
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={() => toggleArrayFilter('levels', level)}
                className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{level}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Prix">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              className="w-20 px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800"
              placeholder="Min"
            />
            <span className="text-neutral-500">-</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 500])}
              className="w-20 px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800"
              placeholder="Max"
            />
            <span className="text-sm text-neutral-500">€</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Note minimum">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => updateFilter('rating', rating)}
                className="border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-1">& plus</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Durée">
        <div className="space-y-2">
          {durations.map((duration) => (
            <label key={duration} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.duration.includes(duration)}
                onChange={() => toggleArrayFilter('duration', duration)}
                className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{duration}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection title="Langue">
        <div className="space-y-2">
          {languages.map((language) => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.language.includes(language)}
                onChange={() => toggleArrayFilter('language', language)}
                className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{language}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm"
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filtres
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 ${className}`}>
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-neutral-800 shadow-xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Filtres</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default ProductFilterSidebar 