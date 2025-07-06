import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  CalendarIcon,
  ClockIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

interface CalendarEvent {
  id: string
  title: string
  type: 'course' | 'live' | 'meeting' | 'deadline'
  date: string
  time: string
  duration?: number
  isLive?: boolean
  participants?: number
}

interface CalendarWidgetProps {
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  events,
  onEventClick
}) => {
  const { t } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
      case 'live':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
      case 'meeting':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
      case 'deadline':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-900/20 dark:text-neutral-400'
    }
  }
  
  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'live':
        return <PlayIcon className="w-4 h-4" />
      default:
        return <CalendarIcon className="w-4 h-4" />
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return t('dashboard.today')
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t('dashboard.tomorrow')
    } else {
      return date.toLocaleDateString('fr-FR', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      })
    }
  }
  
  const groupEventsByDate = (events: CalendarEvent[]) => {
    const grouped: Record<string, CalendarEvent[]> = {}
    events.forEach(event => {
      const dateKey = new Date(event.date).toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })
    return grouped
  }
  
  const groupedEvents = groupEventsByDate(events)
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {t('dashboard.upcomingEvents')}
        </h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </motion.button>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </motion.button>
        </div>
      </div>
      
      {/* Events */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {sortedDates.slice(0, 7).map((dateKey, dateIndex) => (
            <motion.div
              key={dateKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: dateIndex * 0.1 }}
              className="space-y-2"
            >
              {/* Date header */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {formatDate(dateKey)}
                </span>
              </div>
              
              {/* Events for this date */}
              <div className="space-y-2 ml-4">
                {groupedEvents[dateKey].map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (dateIndex * 0.1) + (eventIndex * 0.05) }}
                    onClick={() => onEventClick?.(event)}
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {event.title}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          {event.duration && (
                            <span>• {event.duration}min</span>
                          )}
                          {event.participants && (
                            <span>• {event.participants} participants</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {event.isLive && (
                      <div className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {sortedDates.length === 0 && (
          <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('dashboard.noUpcomingEvents')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarWidget 