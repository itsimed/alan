import React from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  Cog6ToothIcon,
  FolderIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { mockConversations } from '@/lib/data'

interface StudioSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onConversationSelect: (conversationId: string) => void
  isCollapsed?: boolean
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({
  activeTab,
  onTabChange,
  onConversationSelect,
  isCollapsed = false
}) => {
  const sidebarItems = [
    {
      id: 'new-session',
      label: 'Nouvelle session',
      icon: PlusIcon,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'conversations',
      label: 'Mes conversations',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'favorites',
      label: 'Favoris',
      icon: HeartIcon,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      id: 'projects',
      label: 'Projets',
      icon: FolderIcon,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'ai-tools',
      label: 'Outils IA',
      icon: SparklesIcon,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Cog6ToothIcon,
      color: 'text-gray-600 dark:text-gray-400'
    }
  ]

  const favoriteConversations = mockConversations.filter(conv => conv.favorite)

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 ${
        isCollapsed ? 'w-16' : 'w-80'
      } flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Studio AI
            </h2>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Conversations Section */}
        {activeTab === 'conversations' && !isCollapsed && (
          <div className="px-4 pb-4">
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
              Conversations récentes
            </h3>
            <div className="space-y-2">
              {mockConversations.slice(0, 5).map((conversation) => (
                <motion.button
                  key={conversation.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => onConversationSelect(conversation.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {conversation.title}
                    </h4>
                    {conversation.favorite && (
                      <HeartIcon className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                    {conversation.messageCount} messages
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Section */}
        {activeTab === 'favorites' && !isCollapsed && (
          <div className="px-4 pb-4">
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
              Conversations favorites
            </h3>
            <div className="space-y-2">
              {favoriteConversations.map((conversation) => (
                <motion.button
                  key={conversation.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => onConversationSelect(conversation.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {conversation.title}
                    </h4>
                    <HeartIcon className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {conversation.lastMessage}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StudioSidebar 