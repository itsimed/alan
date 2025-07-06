'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, PhotoIcon, VideoCameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface EditorBlock {
  id: string
  type: 'text' | 'image' | 'video' | 'quiz'
  content: string
  position: { x: number; y: number }
}

const DropZoneEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<EditorBlock[]>([
    {
      id: '1',
      type: 'text',
      content: 'Introduction au cours',
      position: { x: 50, y: 100 }
    }
  ])

  const addBlock = (type: EditorBlock['type']) => {
    const newBlock: EditorBlock = {
      id: Date.now().toString(),
      type,
      content: `Nouveau ${type}`,
      position: { x: Math.random() * 400 + 50, y: Math.random() * 300 + 100 }
    }
    setBlocks([...blocks, newBlock])
  }

  return (
    <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
      {/* Canvas */}
      <div className="absolute inset-0 p-8">
        <div className="w-full h-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 relative">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Empty State */}
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <PlusIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  Commencez à créer
                </h3>
                <p className="text-neutral-500 dark:text-neutral-500">
                  Glissez-déposez des éléments ou cliquez sur les outils
                </p>
              </div>
            </div>
          )}

          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              drag
              dragMomentum={false}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                left: block.position.x,
                top: block.position.y
              }}
              className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-600 cursor-move min-w-48 max-w-80"
            >
              <div className="flex items-center mb-2">
                {block.type === 'text' && <DocumentTextIcon className="w-5 h-5 text-blue-600 mr-2" />}
                {block.type === 'image' && <PhotoIcon className="w-5 h-5 text-green-600 mr-2" />}
                {block.type === 'video' && <VideoCameraIcon className="w-5 h-5 text-red-600 mr-2" />}
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
                  {block.type}
                </span>
              </div>
              <div className="text-neutral-900 dark:text-white">
                {block.content}
              </div>
              {block.type === 'image' && (
                <div className="mt-2 w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded flex items-center justify-center">
                  <PhotoIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              {block.type === 'video' && (
                <div className="mt-2 w-full h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded flex items-center justify-center">
                  <VideoCameraIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addBlock('text')}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <DocumentTextIcon className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addBlock('image')}
          className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <PhotoIcon className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addBlock('video')}
          className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <VideoCameraIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  )
}

export default DropZoneEditor 