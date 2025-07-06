export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
  reviewCount: number
  instructor: {
    name: string
    avatar: string
    verified: boolean
  }
  thumbnail: string
  tags: string[]
  isLive?: boolean
  students: number
  language: string
  lastUpdated: string
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Maîtrise du Marketing Digital',
    description: 'Apprenez les stratégies de marketing digital les plus efficaces pour développer votre business en ligne.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Marketing',
    level: 'intermediate',
    duration: '12h 30min',
    rating: 4.8,
    reviewCount: 234,
    instructor: {
      name: 'Sarah Martin',
      avatar: '/avatars/sarah.jpg',
      verified: true
    },
    thumbnail: '/products/marketing-digital.jpg',
    tags: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
    students: 1250,
    language: 'Français',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Développement Web avec React',
    description: 'Créez des applications web modernes avec React, TypeScript et les meilleures pratiques.',
    price: 149.99,
    category: 'Développement',
    level: 'intermediate',
    duration: '25h 15min',
    rating: 4.9,
    reviewCount: 567,
    instructor: {
      name: 'Ahmed Ben Ali',
      avatar: '/avatars/ahmed.jpg',
      verified: true
    },
    thumbnail: '/products/react-development.jpg',
    tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
    isLive: true,
    students: 2100,
    language: 'Français',
    lastUpdated: '2024-01-12'
  },
  {
    id: '3',
    title: 'Design UX/UI Avancé',
    description: 'Maîtrisez les outils et méthodologies pour créer des interfaces utilisateur exceptionnelles.',
    price: 119.99,
    category: 'Design',
    level: 'advanced',
    duration: '18h 45min',
    rating: 4.7,
    reviewCount: 189,
    instructor: {
      name: 'Lisa Chen',
      avatar: '/avatars/lisa.jpg',
      verified: true
    },
    thumbnail: '/products/ux-ui-design.jpg',
    tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    students: 890,
    language: 'Français',
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    title: 'Intelligence Artificielle pour Débutants',
    description: 'Découvrez les bases de l\'IA et apprenez à créer vos premiers modèles de machine learning.',
    price: 199.99,
    category: 'Technologie',
    level: 'beginner',
    duration: '20h 30min',
    rating: 4.6,
    reviewCount: 345,
    instructor: {
      name: 'Dr. Jean Dupont',
      avatar: '/avatars/jean.jpg',
      verified: true
    },
    thumbnail: '/products/ai-beginners.jpg',
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    students: 1500,
    language: 'Français',
    lastUpdated: '2024-01-08'
  },
  {
    id: '5',
    title: 'Entrepreneuriat et Innovation',
    description: 'Transformez vos idées en business rentable avec les stratégies d\'entrepreneurs à succès.',
    price: 79.99,
    category: 'Business',
    level: 'beginner',
    duration: '15h 20min',
    rating: 4.8,
    reviewCount: 456,
    instructor: {
      name: 'Omar Benali',
      avatar: '/avatars/omar.jpg',
      verified: true
    },
    thumbnail: '/products/entrepreneurship.jpg',
    tags: ['Startup', 'Business Plan', 'Financement', 'Innovation'],
    students: 1800,
    language: 'Français',
    lastUpdated: '2024-01-05'
  },
  {
    id: '6',
    title: 'Photographie Professionnelle',
    description: 'Apprenez les techniques de photographie professionnelle et la post-production.',
    price: 99.99,
    category: 'Créatif',
    level: 'intermediate',
    duration: '14h 10min',
    rating: 4.9,
    reviewCount: 278,
    instructor: {
      name: 'Marie Dubois',
      avatar: '/avatars/marie.jpg',
      verified: true
    },
    thumbnail: '/products/photography.jpg',
    tags: ['Lightroom', 'Photoshop', 'Portrait', 'Paysage'],
    isLive: true,
    students: 650,
    language: 'Français',
    lastUpdated: '2024-01-03'
  }
]

export const categories = [
  'Tous',
  'Marketing',
  'Développement',
  'Design',
  'Technologie',
  'Business',
  'Créatif'
]

export const levels = [
  'Tous niveaux',
  'Débutant',
  'Intermédiaire',
  'Avancé'
] 