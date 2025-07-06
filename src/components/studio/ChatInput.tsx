import React, { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, MicrophoneIcon, SparklesIcon, CpuChipIcon, BoltIcon, FireIcon, CogIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { quickSuggestions } from '@/lib/data'

interface ChatInputProps {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  loading?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, loading }) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAITools, setShowAITools] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout>()

  const aiTools = [
    { 
      id: 'brain', 
      name: 'Brain Boost', 
      icon: <CogIcon className="w-4 h-4" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Optimisation cognitive'
    },
    { 
      id: 'cpu', 
      name: 'Smart Analysis', 
      icon: <CpuChipIcon className="w-4 h-4" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Analyse intelligente'
    },
    { 
      id: 'bolt', 
      name: 'Quick Generate', 
      icon: <BoltIcon className="w-4 h-4" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Génération rapide'
    },
    { 
      id: 'fire', 
      name: 'Creative Spark', 
      icon: <FireIcon className="w-4 h-4" />,
      color: 'from-red-500 to-pink-500',
      description: 'Inspiration créative'
    }
  ]

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
        setRecordingTime(0)
      }
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [isRecording])

  const handleRecordToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording
      console.log('Recording started...')
    } else {
      // Stop recording
      console.log('Recording stopped...')
    }
  }

  const handleAIToolClick = (toolId: string) => {
    const toolMessages = {
      brain: "🧠 Activation du Brain Boost...",
      cpu: "⚡ Analyse intelligente en cours...",
      bolt: "⚡ Génération rapide activée...",
      fire: "🔥 Inspiration créative en cours..."
    }
    onChange(toolMessages[toolId as keyof typeof toolMessages])
    setShowAITools(false)
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200/50 dark:border-neutral-700/50 px-4 py-3 flex flex-col gap-3">
      {/* AI Tools */}
      <AnimatePresence>
        {showAITools && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="mb-2"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Outils IA
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAITools(false)}
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Fermer
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {aiTools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAIToolClick(tool.id)}
                  className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white text-left hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {tool.icon}
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                  <p className="text-xs opacity-90">{tool.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="mb-2"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Suggestions rapides
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuggestions(false)}
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Fermer
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((sugg, index) => (
                <motion.button
                  key={sugg.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onChange(sugg.text); setShowSuggestions(false) }}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all border border-blue-200 dark:border-blue-800"
                >
                  {sugg.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center py-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                Enregistrement en cours... {formatRecordingTime(recordingTime)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        {/* AI Tools Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAITools(!showAITools)}
          className={`p-2 rounded-lg transition-all ${
            showAITools 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
          }`}
        >
          <SparklesIcon className="w-5 h-5" />
        </motion.button>

        {/* Record Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRecordToggle}
          className={`p-2 rounded-lg transition-all ${
            isRecording 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
          }`}
        >
          <MicrophoneIcon className="w-5 h-5" />
        </motion.button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => { 
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
            placeholder="Écrivez votre message ou utilisez les outils IA..."
            className="w-full px-4 py-2 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 bg-neutral-50/80 dark:bg-neutral-800/80 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            disabled={loading || isRecording}
          />
          
          {/* Suggestions Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
          >
            <SparklesIcon className="w-4 h-4 text-neutral-400" />
          </motion.button>
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSend}
          disabled={!value.trim() || loading || isRecording}
          className={`p-2 rounded-lg transition-all ${
            value.trim() && !loading && !isRecording
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600'
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed'
          }`}
        >
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
          </motion.div>
        </motion.button>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>
          {loading ? 'IA en train de réfléchir...' : 
           isRecording ? 'Enregistrement en cours' : 
           'Prêt à créer'}
        </span>
        <span>
          {value.length} caractères
        </span>
      </div>
    </div>
  )
}

export default ChatInput 