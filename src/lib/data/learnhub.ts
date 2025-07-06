export interface Course {
  id: string
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  thumbnail: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  instructor: string
  nextLesson?: string
}

export interface Session {
  id: string
  title: string
  date: string
  time: string
  duration: string
  instructor: string
  participants: number
  maxParticipants: number
  type: 'live' | 'workshop' | 'webinar'
  status: 'upcoming' | 'live' | 'completed'
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export const learningData = {
  courses: [
    {
      id: '1',
      title: 'Maîtrise du Marketing Digital',
      description: 'Apprenez les stratégies de marketing digital modernes',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      thumbnail: '/courses/marketing-digital.jpg',
      category: 'Marketing',
      difficulty: 'intermediate' as const,
      estimatedTime: '2h 30min restantes',
      instructor: 'Sarah Martin',
      nextLesson: 'Optimisation des campagnes Google Ads'
    },
    {
      id: '2',
      title: 'Développement React Avancé',
      description: 'Créez des applications web complexes avec React',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      thumbnail: '/courses/react-advanced.jpg',
      category: 'Développement',
      difficulty: 'advanced' as const,
      estimatedTime: '8h 15min restantes',
      instructor: 'Ahmed Ben Ali',
      nextLesson: 'Gestion d\'état avec Redux Toolkit'
    },
    {
      id: '3',
      title: 'Design System avec Figma',
      description: 'Construisez des design systems cohérents',
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      thumbnail: '/courses/design-system.jpg',
      category: 'Design',
      difficulty: 'intermediate' as const,
      estimatedTime: '1h 20min restantes',
      instructor: 'Lisa Chen',
      nextLesson: 'Documentation du design system'
    },
    {
      id: '4',
      title: 'Intelligence Artificielle Pratique',
      description: 'Implémentez des solutions IA concrètes',
      progress: 30,
      totalLessons: 28,
      completedLessons: 8,
      thumbnail: '/courses/ai-practical.jpg',
      category: 'Technologie',
      difficulty: 'beginner' as const,
      estimatedTime: '12h 45min restantes',
      instructor: 'Dr. Jean Dupont',
      nextLesson: 'Préparation des données'
    }
  ] as Course[],

  sessions: [
    {
      id: '1',
      title: 'Masterclass: SEO en 2024',
      date: '2024-01-20',
      time: '14:00',
      duration: '2h',
      instructor: 'Sarah Martin',
      participants: 45,
      maxParticipants: 100,
      type: 'webinar' as const,
      status: 'upcoming' as const
    },
    {
      id: '2',
      title: 'Workshop: React Hooks Avancés',
      date: '2024-01-22',
      time: '10:00',
      duration: '3h',
      instructor: 'Ahmed Ben Ali',
      participants: 28,
      maxParticipants: 50,
      type: 'workshop' as const,
      status: 'upcoming' as const
    },
    {
      id: '3',
      title: 'Live Coding: App Mobile React Native',
      date: '2024-01-18',
      time: '16:00',
      duration: '1h 30min',
      instructor: 'Lisa Chen',
      participants: 120,
      maxParticipants: 150,
      type: 'live' as const,
      status: 'live' as const
    },
    {
      id: '4',
      title: 'Conférence: L\'avenir de l\'IA',
      date: '2024-01-15',
      time: '18:00',
      duration: '1h',
      instructor: 'Dr. Jean Dupont',
      participants: 200,
      maxParticipants: 200,
      type: 'webinar' as const,
      status: 'completed' as const
    }
  ] as Session[],

  badges: [
    {
      id: '1',
      name: 'Premier Cours',
      description: 'Complétez votre premier cours',
      icon: '🎓',
      color: 'bg-blue-500',
      earnedAt: '2024-01-10',
      rarity: 'common' as const
    },
    {
      id: '2',
      name: 'Marathonien',
      description: 'Étudiez 10 heures en une semaine',
      icon: '🏃',
      color: 'bg-green-500',
      earnedAt: '2024-01-12',
      rarity: 'rare' as const
    },
    {
      id: '3',
      name: 'Expert Marketing',
      description: 'Complétez 5 cours de marketing',
      icon: '📈',
      color: 'bg-purple-500',
      earnedAt: '2024-01-15',
      rarity: 'epic' as const
    },
    {
      id: '4',
      name: 'Mentor',
      description: 'Aidez 10 autres étudiants',
      icon: '👨‍🏫',
      color: 'bg-orange-500',
      earnedAt: '2024-01-18',
      rarity: 'legendary' as const
    }
  ] as Badge[]
} 