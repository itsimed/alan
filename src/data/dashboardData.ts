// Dashboard mock data for Ayan Bridge V2
export const mockUserProgress = {
  overallProgress: 68,
  activeCourses: 3,
  completedCourses: 12,
  totalCourses: 15,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  streakDays: 7,
  totalStudyHours: 124
}

export const mockActivePathways = [
  {
    id: '1',
    title: 'Développement Web Full Stack',
    progress: 75,
    nextLesson: 'Introduction à Node.js',
    totalLessons: 32,
    completedLessons: 24,
    estimatedTime: '2h 30min',
    difficulty: 'Intermédiaire',
    thumbnail: '/pathways/fullstack.jpg'
  },
  {
    id: '2',
    title: 'Design UI/UX avec Figma',
    progress: 45,
    nextLesson: 'Prototypage avancé',
    totalLessons: 28,
    completedLessons: 13,
    estimatedTime: '1h 45min',
    difficulty: 'Débutant',
    thumbnail: '/pathways/uiux.jpg'
  },
  {
    id: '3',
    title: 'Intelligence Artificielle',
    progress: 30,
    nextLesson: 'Réseaux de neurones',
    totalLessons: 45,
    completedLessons: 14,
    estimatedTime: '3h 15min',
    difficulty: 'Avancé',
    thumbnail: '/pathways/ai.jpg'
  }
]

export const mockUpcomingSessions = [
  {
    id: '1',
    title: 'Masterclass React 19 - Nouvelles fonctionnalités',
    instructor: 'Sarah Johnson',
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    duration: 90,
    participants: 156,
    isLive: false,
    thumbnail: '/sessions/react19.jpg'
  },
  {
    id: '2',
    title: 'Workshop Design System',
    instructor: 'Marc Dubois',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    duration: 120,
    participants: 89,
    isLive: false,
    thumbnail: '/sessions/design-system.jpg'
  },
  {
    id: '3',
    title: 'Live Coding - API REST avec FastAPI',
    instructor: 'Ahmed Hassan',
    startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // Started 30 min ago
    duration: 180,
    participants: 234,
    isLive: true,
    thumbnail: '/sessions/fastapi.jpg'
  }
]

export const mockRecentProducts = [
  {
    id: '1',
    title: 'Template Dashboard Admin',
    price: 49.99,
    thumbnail: '/products/dashboard-template.jpg',
    category: 'Templates',
    rating: 4.8,
    lastViewed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Cours Complet TypeScript',
    price: 79.99,
    thumbnail: '/products/typescript-course.jpg',
    category: 'Cours',
    rating: 4.9,
    lastViewed: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Pack Icônes Premium',
    price: 29.99,
    thumbnail: '/products/icon-pack.jpg',
    category: 'Ressources',
    rating: 4.7,
    lastViewed: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
]

export const mockNotifications = [
  {
    id: '1',
    type: 'reminder' as const,
    title: 'Session programmée dans 2h',
    message: 'N\'oubliez pas votre Masterclass React 19 qui commence à 14h00',
    actionText: 'Voir détails',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    type: 'suggestion' as const,
    title: 'Reprendre votre apprentissage',
    message: 'Vous avez arrêté le cours "Design UI/UX" à 45%. Continuez pour maintenir votre rythme !',
    actionText: 'Reprendre',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Objectif hebdomadaire atteint !',
    message: 'Félicitations ! Vous avez terminé 3 leçons cette semaine.',
    actionText: 'Voir progrès',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    type: 'warning' as const,
    title: 'Série en danger',
    message: 'Votre série de 7 jours se termine dans 6 heures. Terminez une leçon pour la maintenir.',
    actionText: 'Commencer',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
]

export const mockUserStats = {
  totalRevenue: 2847.50,
  monthlyRevenue: 456.80,
  totalSales: 89,
  monthlySales: 12,
  averageRating: 4.7,
  totalReviews: 234,
  profileViews: 1456,
  coursesCreated: 5,
  studentsEnrolled: 892
}

export const mockWeeklyActivity = [
  { day: 'Lun', hours: 2.5, lessons: 3 },
  { day: 'Mar', hours: 1.8, lessons: 2 },
  { day: 'Mer', hours: 3.2, lessons: 4 },
  { day: 'Jeu', hours: 0, lessons: 0 },
  { day: 'Ven', hours: 2.1, lessons: 2 },
  { day: 'Sam', hours: 4.5, lessons: 6 },
  { day: 'Dim', hours: 1.9, lessons: 2 }
] 