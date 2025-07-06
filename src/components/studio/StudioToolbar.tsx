'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  CloudArrowUpIcon, 
  EyeIcon, 
  ShareIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const StudioToolbar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Retour
          </button>
          <div className="text-lg font-semibold text-neutral-900 dark:text-white">
            Mon nouveau cours
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center">
            <EyeIcon className="w-5 h-5 mr-2" />
            Aperçu
          </button>
          <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center">
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            Enregistrer
          </button>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center">
            <ShareIcon className="w-5 h-5 mr-2" />
            Publier
          </button>
          <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudioToolbar 