import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const CapitalPage: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'opportunities' | 'portfolio'>('opportunities')

  // Mock data pour les opportunités
  const opportunities = [
    {
      id: 1,
      title: 'EduTech Startup - Plateforme IA',
      description: 'Startup innovante dans l\'éducation avec IA personnalisée',
      category: 'startups',
      investment: 50000,
      minInvestment: 1000,
      equity: 8,
      duration: '24 mois',
      investors: 45,
      raised: 75,
      image: '/images/startup-edutech.jpg',
      risk: 'Moyen',
      return: '15-25%'
    },
    {
      id: 2,
      title: 'Projet de Formation en Ligne',
      description: 'Développement de cours premium pour développeurs',
      category: 'projects',
      investment: 25000,
      minInvestment: 500,
      equity: 12,
      duration: '18 mois',
      investors: 32,
      raised: 60,
      image: '/images/project-courses.jpg',
      risk: 'Faible',
      return: '10-18%'
    },
    {
      id: 3,
      title: 'Fonds d\'Innovation Éducative',
      description: 'Fonds diversifié dans les technologies éducatives',
      category: 'funds',
      investment: 100000,
      minInvestment: 5000,
      equity: 5,
      duration: '36 mois',
      investors: 128,
      raised: 85,
      image: '/images/fund-innovation.jpg',
      risk: 'Faible',
      return: '8-12%'
    }
  ]

  // Mock data pour le portefeuille
  const portfolio = [
    {
      id: 1,
      title: 'EduTech Startup',
      invested: 5000,
      currentValue: 6250,
      return: 25,
      status: 'active',
      date: '2024-01-01'
    },
    {
      id: 2,
      title: 'Projet Formation',
      invested: 2500,
      currentValue: 2750,
      return: 10,
      status: 'active',
      date: '2024-02-01'
    },
    {
      id: 3,
      title: 'Fonds Innovation',
      invested: 10000,
      currentValue: 10800,
      return: 8,
      status: 'active',
      date: '2024-03-01'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'startups':
        return <BuildingOfficeIcon className="w-6 h-6" />
      case 'projects':
        return <ChartBarIcon className="w-6 h-6" />
      case 'funds':
        return <ArrowTrendingUpIcon className="w-6 h-6" />
      default:
        return <CurrencyDollarIcon className="w-6 h-6" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Élevé':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  const totalInvested = portfolio.reduce((sum, item) => sum + item.invested, 0)
  const totalValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)
  const totalReturn = ((totalValue - totalInvested) / totalInvested) * 100

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
              {t('capital.title')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t('capital.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'opportunities'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {t('capital.opportunities.title')}
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {t('capital.portfolio.title')}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'opportunities' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {t('capital.opportunities.title')}
                </h2>
                <Button variant="outline" size="sm">
                  Voir toutes les opportunités
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card hover className="h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(opportunity.category)}
                          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 capitalize">
                            {opportunity.category}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(opportunity.risk)}`}>
                          {opportunity.risk}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                        {opportunity.description}
                      </p>

                      {/* Investment Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Investissement total
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {opportunity.investment.toLocaleString()}€
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Investissement min.
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {opportunity.minInvestment.toLocaleString()}€
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Équité offerte
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {opportunity.equity}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Retour attendu
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {opportunity.return}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Financement
                          </span>
                          <span className="text-neutral-900 dark:text-white">
                            {opportunity.raised}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${opportunity.raised}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {opportunity.investors}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {opportunity.duration}
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          Investir
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Portfolio Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Total Investi
                    </h3>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {totalInvested.toLocaleString()}€
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Valeur Actuelle
                    </h3>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {totalValue.toLocaleString()}€
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Retour Total
                    </h3>
                    <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalReturn.toFixed(1)}%
                    </p>
                  </div>
                </Card>
              </div>

              {/* Portfolio Items */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {t('capital.portfolio.investments')}
                </h2>
              </div>

              <div className="space-y-4">
                {portfolio.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Investi le {new Date(item.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-right">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Investi
                            </p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {item.invested.toLocaleString()}€
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Valeur actuelle
                            </p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {item.currentValue.toLocaleString()}€
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Retour
                            </p>
                            <p className={`text-lg font-semibold ${item.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.return}%
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CapitalPage 