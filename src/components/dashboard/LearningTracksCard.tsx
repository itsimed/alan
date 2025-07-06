import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapIcon,
  ClockIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { LearningTrack } from '@/lib/data/dashboard'
import Button from '@/components/ui/Button'

interface LearningTracksCardProps {
  tracks: LearningTrack[]
  onViewTrack?: (trackId: string) => void
}

const LearningTracksCard: React.FC<LearningTracksCardProps> = ({ tracks, onViewTrack }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'Intermédiaire':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
      case 'Avancé':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20'
      default:
        return 'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-900/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <MapIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              Parcours d'apprentissage
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Vos formations en cours
            </p>
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="space-y-4">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 cursor-pointer"
            onClick={() => onViewTrack?.(track.id)}
          >
            {/* Track Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {track.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(track.difficulty)}`}>
                    {track.difficulty}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {track.description}
                </p>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-600 dark:text-neutral-400">Progression</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {track.completedCourses}/{track.totalCourses} cours ({track.progress}%)
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${track.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>
            </div>

            {/* Track Details */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>{track.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>{track.category}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-1">
              {track.skills.slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {track.skills.length > 3 && (
                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded text-xs">
                  +{track.skills.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          icon={<AcademicCapIcon className="w-4 h-4" />}
        >
          Découvrir plus de parcours
        </Button>
      </div>
    </motion.div>
  )
}

export default LearningTracksCard