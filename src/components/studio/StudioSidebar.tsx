'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  PaintBrushIcon,
  SparklesIcon,
  PencilIcon,
  ShareIcon,
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline'

const StudioSidebar: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { id: 0, title: 'Type de produit', icon: DocumentTextIcon, completed: true },
    { id: 1, title: 'Thème', icon: PaintBrushIcon, completed: true },
    { id: 2, title: 'IA Assistant', icon: SparklesIcon, completed: false },
    { id: 3, title: 'Éditer', icon: PencilIcon, completed: false },
    { id: 4, title: 'Publier', icon: ShareIcon, completed: false }
  ]

  const tools = [
    { title: 'Texte', icon: DocumentTextIcon, color: 'text-blue-600' },
    { title: 'Image', icon: PhotoIcon, color: 'text-green-600' },
    { title: 'Vidéo', icon: VideoCameraIcon, color: 'text-red-600' },
    { title: 'Audio', icon: MicrophoneIcon, color: 'text-purple-600' }
  ]

  return (
    <div className="w-80 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
      {/* Steps */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Étapes de création
        </h3>
        <div className="space-y-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeStep === step.id
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              <div className={`p-2 rounded-lg mr-3 ${
                step.completed
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : activeStep === step.id
                  ? 'bg-primary-200 dark:bg-primary-800 text-primary-600 dark:text-primary-400'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`font-medium ${
                activeStep === step.id
                  ? 'text-primary-700 dark:text-primary-300'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}>
                {step.title}
              </span>
              {step.completed && (
                <div className="ml-auto w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Outils
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200"
            >
              <tool.icon className={`w-8 h-8 ${tool.color} mx-auto mb-2`} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {tool.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-neutral-900 dark:text-white mb-3">
            Suggestions IA
          </h4>
          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                💡 Ajouter une introduction vidéo
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                📊 Inclure des quiz interactifs
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg">
              <p className="text-sm text-orange-700 dark:text-orange-300">
                🎯 Définir des objectifs clairs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudioSidebar 