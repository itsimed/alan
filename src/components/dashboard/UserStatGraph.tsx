'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ActivityData } from '@/lib/data/user'

interface UserStatGraphProps {
  data: ActivityData[]
}

const UserStatGraph: React.FC<UserStatGraphProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.courses + d.creations + d.investments))

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-neutral-600 dark:text-neutral-400">Cours</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-neutral-600 dark:text-neutral-400">Créations</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-neutral-600 dark:text-neutral-400">Investissements</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 flex items-end space-x-2">
        {data.map((day, index) => {
          const totalHeight = ((day.courses + day.creations + day.investments) / maxValue) * 100
          const coursesHeight = (day.courses / (day.courses + day.creations + day.investments)) * totalHeight
          const creationsHeight = (day.creations / (day.courses + day.creations + day.investments)) * totalHeight
          const investmentsHeight = (day.investments / (day.courses + day.creations + day.investments)) * totalHeight

          return (
            <div key={index} className="flex-1 flex flex-col justify-end h-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${totalHeight}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-t relative overflow-hidden"
              >
                <div 
                  className="absolute bottom-0 w-full bg-blue-500"
                  style={{ height: `${coursesHeight}%` }}
                />
                <div 
                  className="absolute bottom-0 w-full bg-green-500"
                  style={{ 
                    height: `${creationsHeight}%`,
                    bottom: `${coursesHeight}%`
                  }}
                />
                <div 
                  className="absolute bottom-0 w-full bg-orange-500"
                  style={{ 
                    height: `${investmentsHeight}%`,
                    bottom: `${coursesHeight + creationsHeight}%`
                  }}
                />
              </motion.div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">
                {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserStatGraph 