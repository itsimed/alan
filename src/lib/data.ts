export interface Notification {
  id: string
  title: string
  description: string
  timestamp: Date
  type: 'mission' | 'progress' | 'mentor' | 'system'
  read: boolean
}

export interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messageCount: number
  favorite: boolean
}

export interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  attachments?: any[]
}

export interface QuickSuggestion {
  id: string
  text: string
  category: 'course' | 'quiz' | 'presentation' | 'general'
}

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouvelle mission disponible',
    description: 'Une nouvelle mission de création de contenu vous attend',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    type: 'mission',
    read: false
  },
  {
    id: '2',
    title: 'Progrès enregistré',
    description: 'Votre cours "Introduction à React" a été mis à jour',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'progress',
    read: false
  },
  {
    id: '3',
    title: 'Message du mentor',
    description: 'Sarah a commenté votre dernière création',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    type: 'mentor',
    read: true
  },
  {
    id: '4',
    title: 'Mise à jour système',
    description: 'Nouvelles fonctionnalités disponibles dans Studio AI',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: 'system',
    read: true
  }
]

// Mock conversations data
export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Création cours React',
    lastMessage: 'Parfait ! J\'ai généré le plan de cours pour vous.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    messageCount: 12,
    favorite: true
  },
  {
    id: '2',
    title: 'Quiz JavaScript',
    lastMessage: 'Voici 10 questions sur les concepts avancés...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    messageCount: 8,
    favorite: false
  },
  {
    id: '3',
    title: 'Présentation TypeScript',
    lastMessage: 'J\'ai créé une présentation interactive avec animations.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    messageCount: 15,
    favorite: true
  },
  {
    id: '4',
    title: 'Infographie Data Science',
    lastMessage: 'Excellent choix de couleurs ! La visualisation est claire.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    messageCount: 6,
    favorite: false
  }
]

// Quick suggestions for chat input
export const quickSuggestions: QuickSuggestion[] = [
  {
    id: '1',
    text: 'Créer un plan de cours sur...',
    category: 'course'
  },
  {
    id: '2',
    text: 'Générer un quiz interactif sur...',
    category: 'quiz'
  },
  {
    id: '3',
    text: 'Créer une présentation avec animations sur...',
    category: 'presentation'
  },
  {
    id: '4',
    text: 'Comment puis-je améliorer mon contenu ?',
    category: 'general'
  },
  {
    id: '5',
    text: 'Aide-moi à structurer ma formation',
    category: 'general'
  }
]

// Format timestamp for display
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24) return `Il y a ${hours}h`
  if (days < 7) return `Il y a ${days}j`
  
  return timestamp.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  })
}

// Get notification type color
export const getNotificationTypeColor = (type: Notification['type']): string => {
  switch (type) {
    case 'mission':
      return 'bg-blue-500'
    case 'progress':
      return 'bg-green-500'
    case 'mentor':
      return 'bg-purple-500'
    case 'system':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
} 