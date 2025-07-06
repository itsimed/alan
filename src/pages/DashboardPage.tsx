import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  PlayIcon,
  BookOpenIcon,
  BoltIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
  UserGroupIcon,
  LightBulbIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import ProgressChart from '@/components/dashboard/ProgressChart'
import RecommendationCard from '@/components/dashboard/RecommendationCard'
import CalendarWidget from '@/components/dashboard/CalendarWidget'
import RevenueWidget from '@/components/dashboard/RevenueWidget'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { 
  dashboardData, 
  revenueData, 
  recommendations, 
  calendarEvents,
  currentUser
} from '@/lib/data/dashboardData'

const DashboardPage: React.FC = () => {
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return t('dashboard.goodMorning')
    if (hour < 18) return t('dashboard.goodAfternoon')
    return t('dashboard.goodEvening')
  }

  const getMotivationalMessage = () => {
    const messages = [
      "Continuez sur cette lancée ! 🚀",
      "Votre progression est excellente ! 💪",
      "Chaque jour vous rapproche de vos objectifs ! ⭐",
      "L'apprentissage est un voyage, pas une destination ! 🎯"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  // Stats rapides intelligentes
  const intelligentStats = [
    {
      id: 'learning-streak',
      title: 'Série d\'apprentissage',
      value: '7 jours',
      icon: <FireIcon className="w-6 h-6" />,
      color: 'orange' as const,
      trend: '+2 depuis la semaine dernière',
      bgGradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'completion-rate',
      title: 'Taux de réussite',
      value: '94%',
      icon: <TrophyIcon className="w-6 h-6" />,
      color: 'green' as const,
      trend: '+8% ce mois',
      bgGradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'study-time',
      title: 'Temps d\'étude',
      value: `${dashboardData.stats.studyTime}h`,
      icon: <ClockIcon className="w-6 h-6" />,
      color: 'blue' as const,
      trend: '+5h cette semaine',
      bgGradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'revenue',
      title: 'Revenus ce mois',
      value: `${revenueData.monthly}€`,
      icon: <CurrencyEuroIcon className="w-6 h-6" />,
      color: 'purple' as const,
      trend: `+${revenueData.growth}%`,
      bgGradient: 'from-purple-500 to-violet-500'
    }
  ]

  const quickActions = [
    {
      id: 'continue-course',
      title: 'Continuer React 19',
      description: 'Reprendre où vous vous êtes arrêté',
      icon: <PlayIcon className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'start-session',
      title: 'Session live dans 30min',
      description: 'Trading Crypto Avancé',
      icon: <CalendarDaysIcon className="w-5 h-5" />,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'create-content',
      title: 'Créer du contenu',
      description: 'Studio IA disponible',
      icon: <LightBulbIcon className="w-5 h-5" />,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  const handleStartCourse = (courseId: string) => {
    console.log('Starting course:', courseId)
  }

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event)
  }

  return (
    <div className="space-y-8">
      {/* Header Intelligent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {getGreeting()}, {currentUser.name.split(' ')[0]} ! 👋
              </motion.h1>
              <motion.p 
                className="text-primary-100 text-lg mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {getMotivationalMessage()}
              </motion.p>
              <motion.div 
                className="flex items-center space-x-4 text-sm text-primary-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span>📅 {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>⏰ {currentTime.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </motion.div>
            </div>
            
            {/* Quick Actions */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className={`${action.color} text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {action.icon}
                    <span className="font-medium text-sm">{action.title}</span>
                  </div>
                  <p className="text-xs opacity-90">{action.description}</p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Intelligentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {intelligentStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative overflow-hidden"
          >
            <Card className="relative overflow-hidden bg-white dark:bg-neutral-800">
              {/* Gradient Background */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.bgGradient} opacity-10 rounded-full -mr-10 -mt-10`}></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} text-white`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {stat.trend}
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-neutral-700 dark:text-neutral-300">
                  {stat.title}
                </h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contenu Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Colonne Principale */}
        <div className="xl:col-span-2 space-y-8">
          {/* Progression Intelligente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center space-x-2">
                  <ChartBarIcon className="w-6 h-6 text-primary-600" />
                  <span>Progression Intelligente</span>
                </h2>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressChart
                  progress={dashboardData.stats.weeklyGoal}
                  title="Objectif Hebdomadaire"
                  subtitle="3 cours terminés"
                  color="green"
                />
                <ProgressChart
                  progress={75}
                  title="React 19 & Next.js"
                  subtitle="12/16 leçons"
                  color="blue"
                />
                <ProgressChart
                  progress={45}
                  title="Certification IA"
                  subtitle="En cours"
                  color="purple"
                />
              </div>
            </Card>
          </motion.div>

          {/* Recommandations IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center space-x-2">
                  <BoltIcon className="w-6 h-6 text-yellow-500" />
                  <span>Recommandations IA</span>
                </h2>
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full">
                  Personnalisé pour vous
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            </Card>
          </motion.div>

          {/* Parcours Actifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center space-x-2">
                  <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  <span>Mes Parcours Actifs</span>
                </h2>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>
              
              <div className="space-y-4">
                {dashboardData.activePathways.map((pathway, index) => (
                  <motion.div
                    key={pathway.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                            {pathway.title.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {pathway.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {pathway.completedLessons}/{pathway.totalLessons} leçons • {pathway.estimatedTime} restant
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-neutral-900 dark:text-white">
                          {pathway.progress}%
                        </div>
                        <div className="w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-1">
                          <motion.div 
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pathway.progress}%` }}
                            transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Droite */}
        <div className="space-y-6">
          {/* Revenus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <RevenueWidget data={revenueData} />
          </motion.div>

          {/* Calendrier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <CalendarWidget 
              events={calendarEvents}
              onEventClick={handleEventClick}
            />
          </motion.div>

          {/* Communauté */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Communauté Active
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Rejoignez 1,247 apprenants en ligne
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Rejoindre le chat
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 