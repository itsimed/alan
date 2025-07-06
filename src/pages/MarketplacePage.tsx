import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'

const MarketplacePage: React.FC = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data pour les produits
  const products = [
    {
      id: 1,
      title: 'Cours complet React 19',
      description: 'Maîtrisez React 19 avec ce cours complet incluant les nouvelles fonctionnalités',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 1247,
      category: 'courses',
      image: '/images/course-react.jpg',
      author: 'Jean Dupont',
      badge: 'Bestseller'
    },
    {
      id: 2,
      title: 'Template Dashboard Pro',
      description: 'Template moderne et responsive pour dashboard d\'entreprise',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.6,
      reviews: 892,
      category: 'templates',
      image: '/images/template-dashboard.jpg',
      author: 'Design Studio',
      badge: 'Nouveau'
    },
    {
      id: 3,
      title: 'Outil d\'analyse SEO',
      description: 'Outil complet pour l\'analyse et l\'optimisation SEO',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 567,
      category: 'tools',
      image: '/images/tool-seo.jpg',
      author: 'SEO Experts',
      badge: 'Populaire'
    },
    {
      id: 4,
      title: 'Guide TypeScript Avancé',
      description: 'Livre numérique sur les techniques avancées de TypeScript',
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.7,
      reviews: 1234,
      category: 'books',
      image: '/images/book-typescript.jpg',
      author: 'Marie Martin',
      badge: 'Recommandé'
    }
  ]

  const categories = [
    { id: 'all', name: t('marketplace.categories.all') },
    { id: 'courses', name: t('marketplace.categories.courses') },
    { id: 'templates', name: t('marketplace.categories.templates') },
    { id: 'tools', name: t('marketplace.categories.tools') },
    { id: 'books', name: t('marketplace.categories.books') },
    { id: 'software', name: t('marketplace.categories.software') }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {t('marketplace.title')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t('marketplace.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <Input
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                Aucun produit trouvé pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    {/* Product Image */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-lg flex items-center justify-center">
                        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                          Image du produit
                        </span>
                      </div>
                      {product.badge && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-secondary-600 text-white text-xs px-2 py-1 rounded-full">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        {product.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-neutral-300 dark:text-neutral-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Author */}
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                        Par {product.author}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                            {product.price}€
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                              {product.originalPrice}€
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<ShoppingCartIcon className="w-4 h-4" />}
                        className="w-full"
                      >
                        Ajouter au panier
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MarketplacePage 