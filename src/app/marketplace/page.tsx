import React from 'react'
import { Metadata } from 'next'
import SearchBar from '@/components/marketplace/SearchBar'
import ProductFilterSidebar from '@/components/marketplace/ProductFilterSidebar'
import InfiniteGrid from '@/components/marketplace/InfiniteGrid'

export const metadata: Metadata = {
  title: 'Marketplace - Ayan Bridge V2',
  description: 'Explorez notre marketplace de contenus éducatifs',
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
          <p className="text-xl text-primary-100">
            Découvrez des milliers de contenus éducatifs créés par notre communauté
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <InfiniteGrid />
          </div>
        </div>
      </div>
    </div>
  )
} 