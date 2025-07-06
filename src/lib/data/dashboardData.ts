// Nouvelles données pour les composants modernisés
export const revenueData = {
  total: 12450,
  monthly: 3200,
  weekly: 850,
  growth: 12.5,
  trend: 'up' as const,
  sources: {
    courses: 7500,
    products: 3200,
    investments: 1750
  }
}

export const recommendations = [
  {
    id: 'rec-1',
    title: 'Maîtriser React 19 et Next.js 14',
    description: 'Apprenez les dernières fonctionnalités de React 19 et Next.js 14 pour créer des applications web modernes et performantes.',
    category: 'Développement Web',
    difficulty: 'Intermédiaire' as const,
    duration: '8h 30min',
    rating: 4.8,
    students: 1250,
    reason: 'Recommandé pour vous',
    thumbnail: '/images/courses/react-nextjs.jpg'
  },
  {
    id: 'rec-2',
    title: 'Trading Crypto Avancé',
    description: 'Stratégies avancées de trading crypto, analyse technique et gestion des risques pour maximiser vos profits.',
    category: 'Finance',
    difficulty: 'Avancé' as const,
    duration: '12h 15min',
    rating: 4.9,
    students: 890,
    reason: 'Basé sur vos intérêts',
    thumbnail: '/images/courses/crypto-trading.jpg'
  },
  {
    id: 'rec-3',
    title: 'Design UX/UI avec Figma',
    description: 'Créez des interfaces utilisateur modernes et intuitives avec Figma, de la conception à la livraison.',
    category: 'Design',
    difficulty: 'Débutant' as const,
    duration: '6h 45min',
    rating: 4.7,
    students: 2100,
    reason: 'Tendance',
    thumbnail: '/images/courses/figma-design.jpg'
  }
]

export const calendarEvents = [
  {
    id: 'event-1',
    title: 'Live: Stratégies de Trading 2024',
    type: 'live' as const,
    date: new Date().toISOString(),
    time: '14:00',
    duration: 90,
    isLive: true,
    participants: 450
  },
  {
    id: 'event-2',
    title: 'Webinaire: React Server Components',
    type: 'course' as const,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    time: '19:00',
    duration: 60,
    participants: 120
  },
  {
    id: 'event-3',
    title: 'Réunion équipe projet',
    type: 'meeting' as const,
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: '10:30',
    duration: 45,
    participants: 8
  },
  {
    id: 'event-4',
    title: 'Remise projet final',
    type: 'deadline' as const,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    time: '23:59',
    duration: 0
  },
  {
    id: 'event-5',
    title: 'Cours: Architecture Microservices',
    type: 'course' as const,
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    time: '16:00',
    duration: 120,
    participants: 85
  }
]

export const notifications = [
  {
    id: 'notif-1',
    type: 'course' as const,
    title: 'Nouveau cours disponible',
    message: 'Le cours "React 19 Avancé" vient d\'être publié et correspond à vos intérêts.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/courses/react-19-advanced'
  },
  {
    id: 'notif-2',
    type: 'live' as const,
    title: 'Session live dans 30 minutes',
    message: 'La session "Stratégies de Trading 2024" commence bientôt. Rejoignez-nous !',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/live/trading-strategies-2024'
  },
  {
    id: 'notif-3',
    type: 'revenue' as const,
    title: 'Nouveau paiement reçu',
    message: 'Vous avez reçu 125€ pour la vente de votre cours "JavaScript Moderne".',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'notif-4',
    type: 'system' as const,
    title: 'Mise à jour système',
    message: 'Nouvelles fonctionnalités disponibles dans votre studio de création.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: '/studio'
  },
  {
    id: 'notif-5',
    type: 'reminder' as const,
    title: 'Rappel: Compléter votre profil',
    message: 'Ajoutez une photo de profil pour améliorer votre visibilité.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: '/profile'
  }
]

export const currentUser = {
  id: 'user-1',
  name: 'Ahmed Benali',
  email: 'ahmed.benali@example.com',
  avatar: '/images/avatars/ahmed.jpg',
  role: 'Créateur de contenu'
}

export const dashboardData = {
  stats: {
    activeCourses: 5,
    weeklyGoal: 82,
    studyTime: 14,
    totalPurchases: 12,
    totalRevenue: 12450,
    completedProjects: 8
  },
  activePathways: [
    {
      id: 'path-1',
      title: 'React 19 & Next.js',
      completedLessons: 12,
      totalLessons: 16,
      estimatedTime: '2h 30min',
      progress: 75
    },
    {
      id: 'path-2',
      title: 'Crypto Trading',
      completedLessons: 7,
      totalLessons: 14,
      estimatedTime: '1h 10min',
      progress: 50
    },
    {
      id: 'path-3',
      title: 'UX/UI Design',
      completedLessons: 3,
      totalLessons: 8,
      estimatedTime: '45min',
      progress: 38
    }
  ]
} 