import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  AcademicCapIcon,
  LightBulbIcon,
  VideoCameraIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ClockIcon,
  PlayIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

const TABS = [
  {
    id: 'school',
    label: 'Bridge School',
    icon: AcademicCapIcon,
    color: 'text-blue-600'
  },
  {
    id: 'academy',
    label: 'Bridge Academy',
    icon: LightBulbIcon,
    color: 'text-orange-500'
  },
  {
    id: 'live',
    label: 'Bridge Live',
    icon: VideoCameraIcon,
    color: 'text-cyan-600'
  }
]

const LearnHubPage: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('school')

  // Mock data (simple, sans image ni prix)
  const featuredCourses = [
    {
      id: 1,
      title: 'React 19 - Les fondamentaux',
      description: 'Apprenez les bases de React 19 avec des projets pratiques',
      instructor: 'Jean Dupont',
      duration: '8h 30min',
      level: 'Débutant',
      category: 'Développement Web',
      participants: 1247
    },
    {
      id: 2,
      title: 'TypeScript Avancé',
      description: 'Maîtrisez TypeScript pour des applications robustes',
      instructor: 'Marie Martin',
      duration: '12h 15min',
      level: 'Intermédiaire',
      category: 'Développement Web',
      participants: 892
    }
  ]
  const academyWorkshops = [
    {
      id: 1,
      title: 'Atelier UI/UX Design',
      description: 'Créez des interfaces modernes et intuitives',
      mentor: 'Sophie Bernard',
      date: '2024-02-10',
      duration: '3h',
      level: 'Tous niveaux',
      category: 'Design',
      participants: 32
    }
  ]
  const liveEvents = [
    {
      id: 1,
      title: 'Live Q&A React',
      host: 'Jean Dupont',
      date: '2024-02-15T18:00:00Z',
      duration: '1h',
      status: 'upcoming',
      category: 'Développement Web',
      participants: 56
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <section className="py-10 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2"
            >
              <SparklesIcon className="w-10 h-10 text-blue-500 dark:text-orange-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-1">
              LearnHub
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2">
              Plateforme simple et moderne pour apprendre, créer et collaborer.
            </p>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 via-orange-400 to-cyan-400 mx-auto mb-4" />
          </motion.div>
          <div className="flex justify-center gap-2 mt-6">
            {TABS.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm border transition-all relative
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-transparent hover:bg-blue-50 dark:hover:bg-blue-900'}
                  `}
                  style={{ position: 'relative' }}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : 'text-neutral-400'}`} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-4 right-4 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-blue-500 via-orange-400 to-cyan-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Section améliorée */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'school' && (
            <motion.div
              key="school"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-8 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6" /> Bridge School
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 flex flex-col gap-2 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden"
                  >
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider mb-1">{course.category}</span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${course.level === 'Débutant' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'} dark:bg-neutral-700 dark:text-white`}>{course.level}</span>
                      <span className="text-xs text-neutral-400">{course.participants} participants</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">{course.description}</p>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      <UserGroupIcon className="w-4 h-4 mr-1" /> {course.instructor}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-2">
                      <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" />{course.duration}</span>
                    </div>
                    <div className="mt-3">
                      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                        <Button variant="primary" size="sm" icon={<PlayIcon className="w-4 h-4" />}>Commencer</Button>
                      </motion.div>
                    </div>
                    {/* Effet gradient au hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-50 via-orange-50 to-cyan-50 dark:from-blue-900/30 dark:via-orange-900/20 dark:to-cyan-900/20" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'academy' && (
            <motion.div
              key="academy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-8 text-orange-600 dark:text-yellow-400 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6" /> Bridge Academy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {academyWorkshops.map((workshop) => (
                  <motion.div
                    key={workshop.id}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 flex flex-col gap-2 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden"
                  >
                    <span className="text-xs font-semibold text-orange-600 dark:text-yellow-400 uppercase tracking-wider mb-1">{workshop.category}</span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{workshop.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-neutral-700 dark:text-white">{workshop.level}</span>
                      <span className="text-xs text-neutral-400">{workshop.participants} participants</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">{workshop.description}</p>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      <UserGroupIcon className="w-4 h-4 mr-1" /> {workshop.mentor}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-2">
                      <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1" />{workshop.date}</span>
                      <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" />{workshop.duration}</span>
                    </div>
                    <div className="mt-3">
                      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                        <Button variant="primary" size="sm" icon={<ArrowTrendingUpIcon className="w-4 h-4" />}>Découvrir</Button>
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-50 via-yellow-50 to-cyan-50 dark:from-orange-900/30 dark:via-yellow-900/20 dark:to-cyan-900/20" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-8 text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                <VideoCameraIcon className="w-6 h-6" /> Bridge Live
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {liveEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 flex flex-col gap-2 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden"
                  >
                    <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-1">{event.category}</span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-neutral-700 dark:text-white">Live</span>
                      <span className="text-xs text-neutral-400">{event.participants} participants</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      <UserGroupIcon className="w-4 h-4 mr-1" /> {event.host}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-2">
                      <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1" />{new Date(event.date).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" />{event.duration}</span>
                    </div>
                    <div className="mt-3">
                      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                        <Button variant="primary" size="sm" icon={<PlayIcon className="w-4 h-4" />}>Rejoindre</Button>
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-50 via-blue-50 to-orange-50 dark:from-cyan-900/30 dark:via-blue-900/20 dark:to-orange-900/20" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default LearnHubPage 