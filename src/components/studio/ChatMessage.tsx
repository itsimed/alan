import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserIcon, SparklesIcon, CpuChipIcon, BoltIcon, FireIcon, CogIcon } from '@heroicons/react/24/outline'
import { formatTimestamp, type ChatMessage as ChatMessageType } from '@/lib/data'

interface ChatMessageProps {
  message: ChatMessageType
  isTyping?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isUser = message.type === 'user'
  const isAI = message.type === 'ai'
  const isSystem = message.type === 'system'

  const getMessageIcon = () => {
    if (isUser) return <UserIcon className="w-5 h-5" />
    if (isSystem) return <CogIcon className="w-5 h-5" />
    return <SparklesIcon className="w-5 h-5" />
  }

  const getMessageStyle = () => {
    if (isUser) {
      return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md shadow-lg'
    }
    if (isSystem) {
      return 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-bl-md shadow-lg'
    }
    return 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-md border border-neutral-200/50 dark:border-neutral-700/50 backdrop-blur-sm shadow-md'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line break-words ${getMessageStyle()}`}>
          {isTyping ? (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-neutral-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-neutral-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-neutral-400 rounded-full"
                />
              </div>
              <span className="text-sm text-neutral-500 ml-2">L'IA réfléchit...</span>
            </div>
          ) : (
            <div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              
              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 space-y-2"
                >
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Suggestions :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              {message.actions && message.actions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 pt-3 border-t border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <div className="flex items-center space-x-2">
                    {message.actions.map((action, index) => (
                      <motion.button
                        key={action.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={action.action}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
          
          {message.timestamp && (
            <div className="text-xs text-neutral-400 mt-2 text-right">
              {formatTimestamp(message.timestamp)}
            </div>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className={`flex items-start ${isUser ? 'order-1 ml-2' : 'order-2 mr-2'}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : isSystem
              ? 'bg-gradient-to-br from-purple-500 to-pink-500'
              : 'bg-gradient-to-br from-green-500 to-emerald-500'
          }`}
        >
          {getMessageIcon()}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ChatMessage 