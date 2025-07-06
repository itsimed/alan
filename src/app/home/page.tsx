import React from 'react'
import { Metadata } from 'next'
import HeroBanner from '@/components/homepage/HeroBanner'
import SectionWrapper from '@/components/homepage/SectionWrapper'
import ProductCarousel from '@/components/homepage/ProductCarousel'
import TestimonialCard from '@/components/homepage/TestimonialCard'
import { testimonials } from '@/lib/data/testimonials'

export const metadata: Metadata = {
  title: 'Accueil - Ayan Bridge V2',
  description: 'Découvrez Ayan Bridge V2, votre plateforme éducative et collaborative',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Comment ça marche */}
      <SectionWrapper
        title="Comment ça marche"
        subtitle="Découvrez comment Ayan Bridge V2 transforme votre expérience d'apprentissage"
        className="py-20 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Explorez</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Découvrez notre vaste bibliothèque de contenus éducatifs
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Créez</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Utilisez notre studio IA pour créer vos propres contenus
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-success-600 dark:text-success-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Partagez</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Monétisez vos créations et investissez dans l'éducation
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Produits populaires */}
      <SectionWrapper
        title="Produits populaires"
        subtitle="Découvrez les contenus les plus appréciés de notre communauté"
        className="py-20"
      >
        <ProductCarousel />
      </SectionWrapper>

      {/* Témoignages */}
      <SectionWrapper
        title="Ce que disent nos utilisateurs"
        subtitle="Rejoignez des milliers d'apprenants satisfaits"
        className="py-20 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
} 