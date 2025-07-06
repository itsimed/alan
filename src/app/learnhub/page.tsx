import React from 'react'
import { Metadata } from 'next'
import DashboardProgress from '@/components/learnhub/DashboardProgress'
import SessionCalendar from '@/components/learnhub/SessionCalendar'
import LearningCard from '@/components/learnhub/LearningCard'
import BadgeCard from '@/components/learnhub/BadgeCard'
import { learningData } from '@/lib/data/learnhub'

export const metadata: Metadata = {
  title: 'Learn Hub - Ayan Bridge V2',
  description: 'Votre centre d\'apprentissage personnalisé',
}

export default function LearnHubPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Ayan Learn Hub</h1>
          <p className="text-xl text-green-100">
            Votre parcours d'apprentissage personnalisé
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardProgress />
        
        {/* Tabs Navigation */}
        <div className="mt-8 border-b border-neutral-200 dark:border-neutral-800">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-green-500 py-2 px-1 text-sm font-medium text-green-600">
              École Virtuelle
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300">
              Académie
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300">
              Bridge Live
            </button>
          </nav>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Mes cours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningData.courses.map((course, index) => (
                <LearningCard key={index} {...course} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Calendar */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sessions à venir</h3>
              <SessionCalendar />
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Mes badges</h3>
              <div className="grid grid-cols-2 gap-4">
                {learningData.badges.map((badge, index) => (
                  <BadgeCard key={index} {...badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 