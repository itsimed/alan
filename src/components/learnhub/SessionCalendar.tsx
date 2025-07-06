'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { learningData } from '@/lib/data/learnhub'

const SessionCalendar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
        <CalendarIcon className="w-5 h-5 mr-2" />
        Sessions à venir
      </h3>
      
      <div className="space-y-4">
        {learningData.sessions.slice(0, 3).map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                {session.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                session.status === 'live' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {session.status === 'live' ? 'En direct' : 'À venir'}
              </span>
            </div>
            
            <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {new Date(session.date).toLocaleDateString('fr-FR')} à {session.time}
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="w-3 h-3 mr-1" />
                {session.participants}/{session.maxParticipants} participants
              </div>
            </div>
            
            <button className="mt-3 w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-xs font-medium transition-colors duration-200">
              {session.status === 'live' ? 'Rejoindre' : 'S\'inscrire'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SessionCalendar 