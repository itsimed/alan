import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  ChartBarIcon,
  BellIcon,
  PlayIcon,
  ShoppingBagIcon,
  FireIcon,
  TrophyIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import DashboardCard from '@/components/dashboard/DashboardCard'
import ProgressWidget from '@/components/dashboard/ProgressWidget'
import LiveSessionPreview from '@/components/dashboard/LiveSessionPreview'
import NotificationWidget from '@/components/dashboard/NotificationWidget'
import Button from '@/components/ui/Button'
import {
  mockUserProgress,
  mockActivePathways,
  mockUpcomingSessions,
  mockRecentProducts,
  mockNotifications,
  mockUserStats,
  mockWeeklyActivity
} from '@/data/dashboardData'

const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])

  const activeNotifications = mockNotifications.filter(
    notification => !dismissedNotifications.includes(notification.id)
  )

  const handleDismissNotification = (id: string) => {
    setDismissedNotifications(prev => [...prev, id])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return t('dashboard.goodMorning')
    if (currentHour < 17) return t('dashboard.goodAfternoon')
    return t('dashboard.goodEvening')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {getGreeting()}, {user?.name || 'Utilisateur'} 👋
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                {t('dashboard.welcomeMessage')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                <FireIcon className="w-5 h-5" />
                <span className="font-semibold">{mockUserProgress.streakDays} jours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DashboardCard
                title={t('dashboard.activeCourses')}
                icon={<AcademicCapIcon className="w-6 h-6" />}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {mockUserProgress.activeCourses}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  sur {mockUserProgress.totalCourses} cours
                </div>
              </DashboardCard>

              <DashboardCard
                title={t('dashboard.weeklyGoal')}
                icon={<TrophyIcon className="w-6 h-6" />}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {mockUserProgress.weeklyCompleted}/{mockUserProgress.weeklyGoal}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  leçons cette semaine
                </div>
              </DashboardCard>

              <DashboardCard
                title={t('dashboard.studyTime')}
                icon={<ClockIcon className="w-6 h-6" />}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {mockUserProgress.totalStudyHours}h
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  temps d'étude total
                </div>
              </DashboardCard>

              <DashboardCard
                title={t('dashboard.progress')}
                icon={<ChartBarIcon className="w-6 h-6" />}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {mockUserProgress.overallProgress}%
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  progression globale
                </div>
              </DashboardCard>
            </motion.div>

            {/* Active Pathways */}
            <motion.div variants={itemVariants}>
              <DashboardCard
                title={t('dashboard.activePathways')}
                icon={<AcademicCapIcon className="w-6 h-6" />}
              >
                <div className="space-y-4">
                  {mockActivePathways.map((pathway) => (
                    <div key={pathway.id} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {pathway.title}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Prochaine leçon: {pathway.nextLesson}
                          </p>
                        </div>
                        <span className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                          {pathway.difficulty}
                        </span>
                      </div>
                      <ProgressWidget
                        title=""
                        progress={pathway.progress}
                        total={pathway.totalLessons}
                        completed={pathway.completedLessons}
                        color="primary"
                        showStats={false}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {pathway.estimatedTime} restant
                        </span>
                        <Button size="sm" variant="outline">
                          Continuer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </motion.div>

            {/* Recent Products */}
            <motion.div variants={itemVariants}>
              <DashboardCard
                title={t('dashboard.recentProducts')}
                icon={<ShoppingBagIcon className="w-6 h-6" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockRecentProducts.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg mb-3 flex items-center justify-center">
                        <ShoppingBagIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {product.category} • {product.price}€
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link to="/marketplace">
                    <Button variant="outline" size="sm">
                      Voir tous les produits
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Notifications */}
            <motion.div variants={itemVariants}>
              <DashboardCard
                title={t('dashboard.notifications')}
                icon={<BellIcon className="w-6 h-6" />}
              >
                <NotificationWidget
                  notifications={activeNotifications}
                  onDismiss={handleDismissNotification}
                />
              </DashboardCard>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div variants={itemVariants}>
              <DashboardCard
                title={t('dashboard.upcomingSessions')}
                icon={<PlayIcon className="w-6 h-6" />}
              >
                <div className="space-y-4">
                  {mockUpcomingSessions.slice(0, 2).map((session) => (
                    <LiveSessionPreview
                      key={session.id}
                      session={session}
                      onJoin={(sessionId) => {
                        console.log('Joining session:', sessionId)
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link to="/learnhub">
                    <Button variant="outline" size="sm">
                      Voir toutes les sessions
                    </Button>
                  </Link>
                </div>
              </DashboardCard>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={itemVariants}>
              <DashboardCard
                title={t('dashboard.weeklyActivity')}
                icon={<ChartBarIcon className="w-6 h-6" />}
              >
                <div className="space-y-3">
                  {mockWeeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 w-8">
                        {day.day}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.hours / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {day.hours}h
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage 