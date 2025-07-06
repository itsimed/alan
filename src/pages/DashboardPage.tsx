import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  ChartBarIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardCard from '@/components/dashboard/DashboardCard'
import ProgressChart from '@/components/dashboard/ProgressChart'
import RecommendationCard from '@/components/dashboard/RecommendationCard'
import CalendarWidget from '@/components/dashboard/CalendarWidget'
import RevenueWidget from '@/components/dashboard/RevenueWidget'
import { 
  dashboardData, 
  revenueData, 
  recommendations, 
  calendarEvents 
} from '@/lib/data/dashboardData'

const DashboardPage: React.FC = () => {
  const { t } = useTranslation()

  const quickStats = [
    {
      id: 'active-courses',
      title: t('dashboard.activeCourses'),
      value: dashboardData.stats.activeCourses,
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'blue',
      trend: '+2 ce mois'
    },
    {
      id: 'weekly-goal',
      title: t('dashboard.weeklyGoal'),
      value: `${dashboardData.stats.weeklyGoal}%`,
      icon: <TrophyIcon className="w-6 h-6" />,
      color: 'green',
      trend: '+15% cette semaine'
    },
    {
      id: 'study-time',
      title: t('dashboard.studyTime'),
      value: `${dashboardData.stats.studyTime}h`,
      icon: <ClockIcon className="w-6 h-6" />,
      color: 'orange',
      trend: '+3h cette semaine'
    },
    {
      id: 'total-revenue',
      title: t('dashboard.stats.totalRevenue'),
      value: `${revenueData.total}€`,
      icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
      color: 'purple',
      trend: `+${revenueData.growth}% ce mois`
    }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t('dashboard.goodMorning')
    if (hour < 18) return t('dashboard.goodAfternoon')
    return t('dashboard.goodEvening')
  }

  const handleStartCourse = (courseId: string) => {
    console.log('Starting course:', courseId)
    // Navigation vers le cours
  }

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event)
    // Navigation vers l'événement
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {getGreeting()}, Ahmed! 👋
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              {t('dashboard.welcomeMessage')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-0"
          >
            <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
              <ChartBarIcon className="w-4 h-4" />
              <span>Dernière connexion: Aujourd'hui 08:30</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DashboardCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                color={stat.color}
              />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                {t('dashboard.progress')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProgressChart
                  progress={dashboardData.stats.weeklyGoal}
                  title="Objectif hebdomadaire"
                  subtitle="3 cours terminés"
                  color="green"
                />
                <ProgressChart
                  progress={75}
                  title="Parcours React"
                  subtitle="12/16 leçons"
                  color="blue"
                />
                <ProgressChart
                  progress={45}
                  title="Certification"
                  subtitle="En cours"
                  color="orange"
                />
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Recommandations pour vous
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.slice(0, 2).map((recommendation, index) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <RecommendationCard
                      recommendation={recommendation}
                      onStart={handleStartCourse}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Active Pathways */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                {t('dashboard.activePathways')}
              </h2>
              <div className="space-y-4">
                {dashboardData.activePathways.map((pathway, index) => (
                  <motion.div
                    key={pathway.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">
                          {pathway.title.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {pathway.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {pathway.completedLessons}/{pathway.totalLessons} leçons • {pathway.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pathway.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {pathway.progress}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Revenue Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <RevenueWidget data={revenueData} />
            </motion.div>

            {/* Calendar Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <CalendarWidget
                events={calendarEvents}
                onEventClick={handleEventClick}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    Créer un nouveau cours
                  </span>
                  <ArrowTrendingUpIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                    Analyser les performances
                  </span>
                  <ChartBarIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                    Programmer une session
                  </span>
                  <ClockIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage 