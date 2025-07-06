'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

const StudioPreview: React.FC = () => {
  return (
    <div className="w-96 bg-white dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center">
            <EyeIcon className="w-5 h-5 mr-2" />
            Aperçu
          </h3>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <DevicePhoneMobileIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <ComputerDesktopIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 h-full">
          {/* Course Preview */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Introduction au cours
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Bienvenue dans ce cours complet sur...
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded flex items-center justify-center mb-2">
                <span className="text-blue-600 dark:text-blue-400 text-sm">Vidéo d'introduction</span>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Chapitre 1: Les bases
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Leçon 1: Introduction
                </li>
                <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full mr-2"></div>
                  Leçon 2: Concepts fondamentaux
                </li>
                <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full mr-2"></div>
                  Leçon 3: Exercices pratiques
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
            Publier le cours
          </button>
          <button className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium">
            Enregistrer comme brouillon
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudioPreview 