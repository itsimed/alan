import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  PlayIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const LearnHubPage: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'courses' | 'sessions'>('courses')

  // Mock data pour les cours
  const courses = [
    {
      id: 1,
      title: 'React 19 - Les fondamentaux',
      description: 'Apprenez les bases de React 19 avec des projets pratiques',
      instructor: 'Jean Dupont',
      duration: '8h 30min',
      level: 'Débutant',
      rating: 4.8,
      students: 1247,
      price: 89.99,
      image: '/images/course-react.jpg',
      category: 'Développement Web'
    },
    {
      id: 2,
      title: 'TypeScript Avancé',
      description: 'Maîtrisez TypeScript pour des applications robustes',
      instructor: 'Marie Martin',
      duration: '12h 15min',
      level: 'Intermédiaire',
      rating: 4.9,
      students: 892,
      price: 129.99,
      image: '/images/course-typescript.jpg',
      category: 'Développement Web'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      description: 'Créez des interfaces utilisateur exceptionnelles',
      instructor: 'Sophie Bernard',
      duration: '6h 45min',
      level: 'Tous niveaux',
      rating: 4.7,
      students: 1567,
      price: 79.99,
      image: '/images/course-design.jpg',
      category: 'Design'
    }
  ]

  // Mock data pour les sessions
  const sessions = [
    {
      id: 1,
      title: 'Live Q&A React 19',
      instructor: 'Jean Dupont',
      date: '2024-01-15T14:00:00Z',
      duration: '1h',
      participants: 45,
      status: 'upcoming',
      category: 'Développement Web'
    },
    {
      id: 2,
      title: 'Workshop TypeScript',
      instructor: 'Marie Martin',
      date: '2024-01-12T10:00:00Z',
      duration: '2h',
      participants: 32,
      status: 'ongoing',
      category: 'Développement Web'
    },
    {
      id: 3,
      title: 'Design Critique Session',
      instructor: 'Sophie Bernard',
      date: '2024-01-10T16:00:00Z',
      duration: '1h 30min',
      participants: 28,
      status: 'past',
      category: 'Design'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'past':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir'
      case 'ongoing':
        return 'En cours'
      case 'past':
        return 'Terminé'
      default:
        return status
    }
  }

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
              {t('learnHub.title')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t('learnHub.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'courses'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {t('learnHub.courses.title')}
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sessions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {t('learnHub.sessions.title')}
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'courses' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {t('learnHub.courses.featured')}
                </h2>
                <Button variant="outline" size="sm">
                  Voir tous les cours
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card hover className="h-full">
                      {/* Course Image */}
                      <div className="relative mb-4">
                        <div className="w-full h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-lg flex items-center justify-center">
                          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                            Image du cours
                          </span>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                          {course.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                          {course.description}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center mb-3">
                          <UserIcon className="w-4 h-4 text-neutral-400 mr-1" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {course.instructor}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 text-neutral-400 mr-1" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {course.duration}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {course.rating}
                            </span>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-neutral-900 dark:text-white">
                            {course.price}€
                          </span>
                          <Button variant="primary" size="sm" icon={<PlayIcon className="w-4 h-4" />}>
                            Commencer
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {t('learnHub.sessions.upcoming')}
                </h2>
                <Button variant="outline" size="sm">
                  Voir toutes les sessions
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card hover className="h-full">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(session.status)}`}>
                            {getStatusText(session.status)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {session.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                          {session.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <UserIcon className="w-4 h-4 text-neutral-400 mr-2" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {session.instructor}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 text-neutral-400 mr-2" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {new Date(session.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 text-neutral-400 mr-2" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {session.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {session.participants} participants
                          </span>
                          <Button
                            variant={session.status === 'upcoming' ? 'primary' : 'outline'}
                            size="sm"
                            disabled={session.status === 'past'}
                          >
                            {session.status === 'upcoming' ? 'Rejoindre' : 
                             session.status === 'ongoing' ? 'En cours' : 'Terminé'}
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

export default LearnHubPage 