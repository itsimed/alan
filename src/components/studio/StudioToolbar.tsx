'use client'

import React from 'react'

interface StudioToolbarProps {
  onSave: () => void
  onExport: () => void
  onShare: () => void
}

const StudioToolbar: React.FC<StudioToolbarProps> = ({ onSave, onExport, onShare }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Studio IA
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Sauvegarder
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Exporter
          </button>
          <button
            onClick={onShare}
            className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
          >
            Partager
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudioToolbar 