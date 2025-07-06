'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Créez, Apprenez,
            <span className="text-secondary-400"> Investissez</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto"
          >
            La plateforme tout-en-un pour créer du contenu avec l'IA, 
            apprendre de nouvelles compétences et investir dans l'avenir
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Commencer gratuitement
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm">
              Découvrir les fonctionnalités
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner 