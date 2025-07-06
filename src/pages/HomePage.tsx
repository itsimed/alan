import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  FireIcon,
  BoltIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import CourseCard from '@/components/dashboard/CourseCard'
import RevisionCard from '@/components/dashboard/RevisionCard'
import RankingCard from '@/components/dashboard/RankingCard'
import AchievementsGrid from '@/components/dashboard/AchievementsGrid'
import LearningTracksCard from '@/components/dashboard/LearningTracksCard'
import DataLabCard from '@/components/dashboard/DataLabCard'
import { 
  currentCourse, 
  recentRevisions, 
  rankingData, 
  achievements, 
  learningTracks, 
  dataLabProjects, 
  currentUser,
  dashboardStats
} from '@/lib/data/dashboard'

const HomePage: React.FC = () => {
  const { t } = useTranslation()

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t('dashboard.greeting.morning', 'Bonjour')
    if (hour < 17) return t('dashboard.greeting.afternoon', 'Bon après-midi')
    return t('dashboard.greeting.evening', 'Bonsoir')
  }

  const handleContinueCourse = () => {
    console.log('Continue course:', currentCourse.id)
  }

  const handleRevisionClick = (revisionId: string) => {
    console.log('Open revision:', revisionId)
  }

  const handleViewLeaderboard = () => {
    console.log('View leaderboard')
  }

  const handleViewAllAchievements = () => {
    console.log('View all achievements')
  }

  const handleViewTrack = (trackId: string) => {
    console.log('View track:', trackId)
  }

  const handleOpenProject = (projectId: string) => {
    console.log('Open project:', projectId)
  }

  const handleViewAllProjects = () => {
    console.log('View all projects')
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Current Course Section */}
          <section>
            <CourseCard 
              course={currentCourse} 
              onContinue={handleContinueCourse}
            />
          </section>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Revisions */}
              <section>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                  {t('dashboard.revisions.title', 'Révisions & Entraînements Récents')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recentRevisions.map((revision, index) => (
                    <RevisionCard
                      key={revision.id}
                      revision={revision}
                      index={index}
                      onClick={() => handleRevisionClick(revision.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <section>
                <AchievementsGrid
                  achievements={achievements}
                  onViewAll={handleViewAllAchievements}
                />
              </section>

              {/* Learning Tracks */}
              <section>
                <LearningTracksCard
                  tracks={learningTracks}
                  onViewTrack={handleViewTrack}
                />
              </section>
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-8">
              {/* Ranking */}
              <section>
                <RankingCard
                  ranking={rankingData}
                  onViewLeaderboard={handleViewLeaderboard}
                />
              </section>

              {/* DataLab Projects */}
              <section>
                <DataLabCard
                  projects={dataLabProjects}
                  onOpenProject={handleOpenProject}
                  onViewAll={handleViewAllProjects}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 