'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  EyeIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

interface StudioPreviewProps {
  content?: string
}

const StudioPreview: React.FC<StudioPreviewProps> = ({ content }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Aperçu
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <ComputerDesktopIcon className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <DeviceTabletIcon className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <DevicePhoneMobileIcon className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <EyeIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-8 min-h-96 flex items-center justify-center">
        {content ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="prose dark:prose-invert max-w-none">
              {content}
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-neutral-500 dark:text-neutral-400">
            <PlayIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>L'aperçu de votre création apparaîtra ici</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudioPreview 