import React from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  ClockIcon,
  AcademicCapIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { CurrentCourse } from '@/lib/data/dashboard'
import Button from '@/components/ui/Button'

interface CourseCardProps {
  course: CurrentCourse
  onContinue?: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onContinue }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Intermédiaire': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'Avancé': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
      case 'Expert': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
      default: return 'text-neutral-600 bg-neutral-100 dark:bg-neutral-900/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 text-white p-8 shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl transform -translate-x-24 translate-y-24" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
              <span className="text-neutral-300 text-sm">{course.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {course.title}
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-neutral-300 text-sm">Progression du cours</span>
            <span className="text-white font-bold text-lg">{course.progress}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-neutral-700 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="w-4 h-4 text-primary-400" />
              <span className="text-neutral-300">
                {course.completedLessons}/{course.totalLessons} leçons
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-blue-400" />
              <span className="text-neutral-300">{course.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-neutral-300">{course.xpToEarn} XP</span>
            </div>
            <div className="flex items-center space-x-2">
              <StarIcon className="w-4 h-4 text-orange-400" />
              <span className="text-neutral-300">{course.instructor}</span>
            </div>
          </div>
        </div>

        {/* Next Lesson */}
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-white font-medium mb-2">Prochaine leçon :</h3>
          <p className="text-neutral-300 text-sm">{course.nextLesson}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onContinue}
            size="lg"
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200"
            icon={<PlayIcon className="w-5 h-5" />}
          >
            Continuer le cours
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/30"
          >
            S'entraîner
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard