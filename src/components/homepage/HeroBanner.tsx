'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  BookOpenIcon, 
  CurrencyDollarIcon, 
  AcademicCapIcon, 
  CogIcon, 
  VideoCameraIcon 
} from '@heroicons/react/24/outline'
import CTAButton from './CTAButton'

const HeroBanner: React.FC = () => {
  const { t } = useTranslation()

  const quickActions = [
    {
      label: 'Explorer la bibliothèque',
      icon: BookOpenIcon,
      href: '/marketplace',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Investir',
      icon: CurrencyDollarIcon,
      href: '/capital',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      label: 'Ayan Learn Hub',
      icon: AcademicCapIcon,
      href: '/learnhub',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Salle d\'opérations',
      icon: CogIcon,
      href: '/studio',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      label: 'Bridge Live',
      icon: VideoCameraIcon,
      href: '/learnhub?tab=live',
      color: 'bg-red-500 hover:bg-red-600'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-bounce-gentle delay-1000"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Bienvenue sur{' '}
            <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
              Ayan Bridge V2
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto leading-relaxed">
            La plateforme éducative nouvelle génération qui transforme 
            l'apprentissage, la création et l'investissement en une expérience unique
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <CTAButton
              primary
              size="lg"
              className="mr-4 mb-4"
            >
              Commencer maintenant
            </CTAButton>
            <CTAButton
              outline
              size="lg"
              className="mb-4"
            >
              Découvrir en vidéo
            </CTAButton>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
          >
            {quickActions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} p-4 rounded-xl text-white transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm bg-opacity-90 group`}
              >
                <action.icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <p className="text-sm font-medium">{action.label}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroBanner 