export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: 'student' | 'creator' | 'investor' | 'admin'
  joinDate: string
  bio: string
  location: string
  website?: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  verified: boolean
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string
  skills: string[]
  thumbnail: string
}

export interface ActivityData {
  date: string
  courses: number
  creations: number
  investments: number
}

export interface RecentActivity {
  id: string
  type: 'course' | 'creation' | 'investment' | 'purchase'
  description: string
  date: string
}

export const userData = {
  profile: {
    id: '1',
    name: 'Alex Dubois',
    email: 'alex.dubois@example.com',
    avatar: '/avatars/alex.jpg',
    role: 'creator' as const,
    joinDate: '2023-06-15',
    bio: 'Passionné de technologie et d\'éducation. Créateur de contenus éducatifs innovants.',
    location: 'Paris, France',
    website: 'https://alexdubois.dev',
    socialLinks: {
      twitter: 'https://twitter.com/alexdubois',
      linkedin: 'https://linkedin.com/in/alexdubois',
      github: 'https://github.com/alexdubois'
    },
    verified: true
  } as UserProfile,

  stats: {
    coursesCompleted: 12,
    revenue: 2450,
    investments: 1800,
    studentsHelped: 156,
    contentCreated: 8,
    totalHours: 89
  },

  certificates: [
    {
      id: '1',
      title: 'Expert en Marketing Digital',
      issuer: 'Ayan Bridge Academy',
      date: '2024-01-15',
      credentialId: 'AB-MD-2024-001',
      skills: ['SEO', 'Google Ads', 'Analytics', 'Social Media'],
      thumbnail: '/certificates/marketing-expert.jpg'
    },
    {
      id: '2',
      title: 'Développeur React Certifié',
      issuer: 'Ayan Bridge Academy',
      date: '2023-12-20',
      credentialId: 'AB-RC-2023-156',
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
      thumbnail: '/certificates/react-developer.jpg'
    },
    {
      id: '3',
      title: 'Designer UX/UI Professionnel',
      issuer: 'Ayan Bridge Academy',
      date: '2023-11-10',
      credentialId: 'AB-UX-2023-089',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      thumbnail: '/certificates/ux-designer.jpg'
    }
  ] as Certificate[],

  activityData: [
    { date: '2024-01-01', courses: 2, creations: 1, investments: 0 },
    { date: '2024-01-02', courses: 1, creations: 0, investments: 1 },
    { date: '2024-01-03', courses: 3, creations: 2, investments: 0 },
    { date: '2024-01-04', courses: 1, creations: 1, investments: 0 },
    { date: '2024-01-05', courses: 2, creations: 0, investments: 2 },
    { date: '2024-01-06', courses: 4, creations: 1, investments: 0 },
    { date: '2024-01-07', courses: 1, creations: 3, investments: 1 }
  ] as ActivityData[],

  recentActivity: [
    {
      id: '1',
      type: 'course' as const,
      description: 'Terminé le cours "Maîtrise du Marketing Digital"',
      date: '2024-01-18'
    },
    {
      id: '2',
      type: 'creation' as const,
      description: 'Publié "Guide complet du SEO 2024"',
      date: '2024-01-17'
    },
    {
      id: '3',
      type: 'investment' as const,
      description: 'Investi 500€ dans "Plateforme E-learning IA"',
      date: '2024-01-16'
    },
    {
      id: '4',
      type: 'purchase' as const,
      description: 'Acheté "Développement React Avancé"',
      date: '2024-01-15'
    },
    {
      id: '5',
      type: 'course' as const,
      description: 'Commencé "Intelligence Artificielle Pratique"',
      date: '2024-01-14'
    }
  ] as RecentActivity[]
} 