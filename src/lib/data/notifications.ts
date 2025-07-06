// Types pour les notifications intelligentes
export interface Notification {
  id: string
  type: 'course' | 'revenue' | 'social' | 'system' | 'calendar' | 'achievement' | 'reminder'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionUrl?: string
  actionText?: string
  avatar?: string
  icon?: React.ReactNode
  category?: string
  metadata?: {
    courseId?: string
    amount?: number
    userId?: string
    achievementId?: string
  }
}

// Données mockées pour notifications intelligentes
export const notificationsData: Notification[] = [
  {
    id: 'notif-1',
    type: 'course',
    title: 'Nouveau cours recommandé',
    message: 'Le cours "React 19 Server Components" correspond parfaitement à votre parcours JavaScript avancé.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
    read: false,
    priority: 'high',
    actionUrl: '/courses/react-19-server-components',
    actionText: 'Voir le cours',
    category: 'Développement Web'
  },
  {
    id: 'notif-2',
    type: 'achievement',
    title: '🏆 Nouveau badge débloqué !',
    message: 'Félicitations ! Vous avez obtenu le badge "React Master" pour avoir terminé 5 cours React avec excellence.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    read: false,
    priority: 'high',
    actionUrl: '/profile/achievements',
    actionText: 'Voir mes badges',
    metadata: {
      achievementId: 'react-master'
    }
  },
  {
    id: 'notif-3',
    type: 'calendar',
    title: 'Session live dans 15 minutes',
    message: 'N\'oubliez pas votre session "Trading Crypto Avancé" qui commence à 14h30. Préparez vos questions !',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    read: false,
    priority: 'urgent',
    actionUrl: '/live/trading-crypto-advanced',
    actionText: 'Rejoindre maintenant',
    category: 'Finance'
  },
  {
    id: 'notif-4',
    type: 'revenue',
    title: '💰 Nouveau paiement reçu',
    message: 'Vous avez reçu 127€ pour la vente de votre cours "TypeScript pour Débutants". Bravo !',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    read: false,
    priority: 'medium',
    actionUrl: '/dashboard/revenues',
    actionText: 'Voir les revenus',
    metadata: {
      amount: 127
    }
  },
  {
    id: 'notif-5',
    type: 'social',
    title: 'Nouveau commentaire sur votre projet',
    message: 'Sarah Martinez a commenté votre projet DataLab "Analyse des Ventes E-commerce" : "Excellent travail sur la visualisation !"',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    read: true,
    priority: 'medium',
    actionUrl: '/datalab/projects/analyse-ventes-ecommerce',
    actionText: 'Voir le projet',
    avatar: '/images/avatars/sarah.jpg',
    metadata: {
      userId: 'sarah-martinez'
    }
  },
  {
    id: 'notif-6',
    type: 'reminder',
    title: '📚 Rappel de révision',
    message: 'Il est temps de réviser le quiz "Hooks React Avancés". Vous l\'aviez marqué pour révision il y a 3 jours.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
    read: true,
    priority: 'medium',
    actionUrl: '/revisions/hooks-react-advanced',
    actionText: 'Commencer la révision',
    category: 'React'
  },
  {
    id: 'notif-7',
    type: 'system',
    title: 'Nouvelle fonctionnalité disponible',
    message: 'Découvrez le nouveau générateur de code IA dans votre Studio. Créez du code plus rapidement que jamais !',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
    read: true,
    priority: 'low',
    actionUrl: '/studio/code-generator',
    actionText: 'Essayer maintenant'
  },
  {
    id: 'notif-8',
    type: 'course',
    title: 'Cours bientôt terminé',
    message: 'Plus que 2 leçons pour terminer "Machine Learning avec Python" ! Vous êtes à 87% de progression.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12h ago
    read: true,
    priority: 'medium',
    actionUrl: '/courses/machine-learning-python',
    actionText: 'Continuer le cours',
    category: 'Intelligence Artificielle'
  }
]

// Fonctions utilitaires pour les notifications
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.read).length
}

export const getNotificationsByPriority = (notifications: Notification[], priority: string): Notification[] => {
  return notifications.filter(n => n.priority === priority)
}

export const getRecentNotifications = (notifications: Notification[], hours: number = 24): Notification[] => {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000)
  return notifications.filter(n => new Date(n.timestamp) > cutoff)
}

export const markAsRead = (notifications: Notification[], notificationId: string): Notification[] => {
  return notifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  )
}

export const markAllAsRead = (notifications: Notification[]): Notification[] => {
  return notifications.map(n => ({ ...n, read: true }))
}

export const deleteNotification = (notifications: Notification[], notificationId: string): Notification[] => {
  return notifications.filter(n => n.id !== notificationId)
}

export const getTimeAgo = (timestamp: string): string => {
  const now = new Date()
  const notificationTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "À l'instant"
  if (diffInMinutes < 60) return `${diffInMinutes}min`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}j`
  
  return notificationTime.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short' 
  })
}