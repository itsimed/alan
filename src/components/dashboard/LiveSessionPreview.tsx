import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  PlayIcon, 
  CalendarIcon, 
  ClockIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

interface LiveSession {
  id: string
  title: string
  instructor: string
  startTime: string
  duration: number // minutes
  participants: number
  thumbnail?: string
  isLive?: boolean
}

interface LiveSessionPreviewProps {
  session: LiveSession
  onJoin?: (sessionId: string) => void
}

const LiveSessionPreview: React.FC<LiveSessionPreviewProps> = ({
  session,
  onJoin
}) => {
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState('')
  
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const sessionTime = new Date(session.startTime).getTime()
      const difference = sessionTime - now
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft(t('learnHub.sessions.live'))
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [session.startTime, t])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Live indicator */}
      {session.isLive && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      )}
      
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20">
        {session.thumbnail ? (
          <img 
            src={session.thumbnail} 
            alt={session.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlayIcon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white line-clamp-2">
            {session.title}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {session.instructor}
          </p>
        </div>
        
        {/* Session info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(session.startTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{session.duration}min</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{session.participants}</span>
          </div>
        </div>
        
        {/* Time left and action */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {timeLeft}
          </div>
          <Button
            size="sm"
            variant={session.isLive ? "primary" : "outline"}
            onClick={() => onJoin?.(session.id)}
            icon={<PlayIcon className="w-4 h-4" />}
          >
            {session.isLive ? t('common.join') : t('common.remind')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default LiveSessionPreview 