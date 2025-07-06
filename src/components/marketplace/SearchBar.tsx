'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { products } from '@/lib/data/products'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Rechercher des cours, formations, créateurs..."
}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      const filtered = products
        .filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .map(product => product.title)
        .slice(0, 5)
      
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch?.('')
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <XMarkIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center">
                <MagnifyingGlassIcon className="h-4 w-4 text-neutral-400 mr-3" />
                <span className="text-neutral-900 dark:text-white">{suggestion}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {/* Popular Searches */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">Populaires:</span>
        {['React', 'Marketing', 'Design', 'IA', 'Entrepreneuriat'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleSearch(tag)}
            className="px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar 