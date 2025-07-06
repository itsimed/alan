// Types pour le dashboard éducatif
export interface CurrentCourse {
  id: string
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  estimatedTime: string
  category: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
  nextLesson: string
  instructor: string
  thumbnail: string
  xpToEarn: number
}

export interface RevisionItem {
  id: string
  title: string
  type: 'exercise' | 'quiz' | 'challenge' | 'project'
  xpEarned: number
  completedAt: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  category: string
  needsReview: boolean
}

export interface RankingData {
  currentRank: number
  totalUsers: number
  league: 'Bronze' | 'Argent' | 'Or' | 'Platine' | 'Diamant'
  xpThisWeek: number
  xpToNextRank: number
  rankProgress: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: 'learning' | 'streak' | 'completion' | 'social' | 'challenge'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
}

export interface LearningTrack {
  id: string
  title: string
  description: string
  totalCourses: number
  completedCourses: number
  progress: number
  estimatedTime: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  category: string
  skills: string[]
}

export interface DataLabProject {
  id: string
  title: string
  description: string
  type: 'notebook' | 'dataset' | 'model' | 'analysis'
  status: 'en_cours' | 'termine' | 'partage' | 'brouillon'
  lastModified: string
  technology: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  estimatedTime: string
}

// Données mockées pour le dashboard
export const currentCourse: CurrentCourse = {
  id: 'course-react-advanced',
  title: 'React 19 & Server Components',
  description: 'Maîtrisez les dernières fonctionnalités de React 19 et les Server Components pour créer des applications modernes et performantes.',
  progress: 68,
  totalLessons: 24,
  completedLessons: 16,
  estimatedTime: '2h 30min',
  category: 'Développement Web',
  difficulty: 'Avancé',
  nextLesson: 'Server Actions et Mutations',
  instructor: 'Sarah Martinez',
  thumbnail: '/images/courses/react-19.jpg',
  xpToEarn: 150
}

export const recentRevisions: RevisionItem[] = [
  {
    id: 'rev-1',
    title: 'Hooks React Avancés',
    type: 'exercise',
    xpEarned: 85,
    completedAt: '2024-01-15T14:30:00Z',
    difficulty: 'Avancé',
    category: 'React',
    needsReview: false
  },
  {
    id: 'rev-2',
    title: 'Quiz TypeScript Types',
    type: 'quiz',
    xpEarned: 120,
    completedAt: '2024-01-14T16:45:00Z',
    difficulty: 'Intermédiaire',
    category: 'TypeScript',
    needsReview: true
  },
  {
    id: 'rev-3',
    title: 'Défi: API REST avec Node.js',
    type: 'challenge',
    xpEarned: 200,
    completedAt: '2024-01-13T10:20:00Z',
    difficulty: 'Avancé',
    category: 'Backend',
    needsReview: false
  }
]

export const rankingData: RankingData = {
  currentRank: 47,
  totalUsers: 15420,
  league: 'Or',
  xpThisWeek: 1250,
  xpToNextRank: 350,
  rankProgress: 78
}

export const achievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Première Série',
    description: 'Complétez votre première série d\'apprentissage de 7 jours',
    icon: '🔥',
    unlockedAt: '2024-01-10T09:00:00Z',
    category: 'streak',
    rarity: 'common',
    xpReward: 100
  },
  {
    id: 'achievement-2',
    title: 'Maître React',
    description: 'Terminez 10 cours de React avec une note supérieure à 90%',
    icon: '⚛️',
    unlockedAt: '2024-01-12T15:30:00Z',
    category: 'learning',
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'achievement-3',
    title: 'Challenger',
    description: 'Réussissez 5 défis de programmation en moins d\'une semaine',
    icon: '🏆',
    unlockedAt: '2024-01-14T11:15:00Z',
    category: 'challenge',
    rarity: 'rare',
    xpReward: 250
  },
  {
    id: 'achievement-4',
    title: 'Perfectionniste',
    description: 'Obtenez 100% sur 3 quiz consécutifs',
    icon: '💎',
    unlockedAt: '2024-01-08T14:20:00Z',
    category: 'completion',
    rarity: 'legendary',
    xpReward: 750
  }
]

export const learningTracks: LearningTrack[] = [
  {
    id: 'track-fullstack',
    title: 'Développeur Full-Stack JavaScript',
    description: 'Devenez un développeur complet avec React, Node.js, et les dernières technologies web',
    totalCourses: 12,
    completedCourses: 8,
    progress: 67,
    estimatedTime: '45h restantes',
    difficulty: 'Intermédiaire',
    category: 'Développement Web',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL']
  },
  {
    id: 'track-ai',
    title: 'Intelligence Artificielle Pratique',
    description: 'Apprenez l\'IA moderne avec Python, TensorFlow, et les dernières techniques de Machine Learning',
    totalCourses: 15,
    completedCourses: 3,
    progress: 20,
    estimatedTime: '78h restantes',
    difficulty: 'Avancé',
    category: 'Intelligence Artificielle',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision']
  }
]

export const dataLabProjects: DataLabProject[] = [
  {
    id: 'project-1',
    title: 'Analyse des Ventes E-commerce',
    description: 'Analyse complète des données de ventes avec visualisations interactives',
    type: 'analysis',
    status: 'en_cours',
    lastModified: '2024-01-15T16:30:00Z',
    technology: 'Python + Pandas',
    difficulty: 'Intermédiaire',
    estimatedTime: '3h'
  },
  {
    id: 'project-2',
    title: 'Modèle de Prédiction des Prix',
    description: 'Modèle de machine learning pour prédire les prix immobiliers',
    type: 'model',
    status: 'termine',
    lastModified: '2024-01-12T14:20:00Z',
    technology: 'Scikit-learn',
    difficulty: 'Avancé',
    estimatedTime: '5h'
  },
  {
    id: 'project-3',
    title: 'Dashboard de Crypto-monnaies',
    description: 'Tableau de bord en temps réel pour suivre les cryptomonnaies',
    type: 'notebook',
    status: 'partage',
    lastModified: '2024-01-10T09:15:00Z',
    technology: 'React + D3.js',
    difficulty: 'Avancé',
    estimatedTime: '6h'
  }
]

// Données utilisateur mockées
export const currentUser = {
  id: 'user-1',
  name: 'Ahmed Benali',
  email: 'ahmed.benali@example.com',
  avatar: '/images/avatars/ahmed.jpg',
  role: 'Créateur de contenu',
  totalXP: 8450,
  level: 12,
  streak: 7,
  joinedAt: '2023-08-15T00:00:00Z'
}

// Statistiques globales
export const dashboardStats = {
  totalCoursesCompleted: 23,
  totalXP: 8450,
  currentStreak: 7,
  longestStreak: 21,
  averageScore: 87,
  timeSpentLearning: 156, // en heures
  certificatesEarned: 5,
  projectsCompleted: 12
}