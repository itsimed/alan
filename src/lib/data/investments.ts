export interface InvestmentOpportunity {
  id: string
  title: string
  description: string
  creator: {
    name: string
    avatar: string
    verified: boolean
  }
  targetAmount: number
  currentAmount: number
  minimumInvestment: number
  expectedReturn: number
  duration: string
  category: string
  riskLevel: 'low' | 'medium' | 'high'
  thumbnail: string
  tags: string[]
  deadline: string
  investors: number
}

export interface LivePitch {
  id: string
  title: string
  presenter: string
  description: string
  startTime: string
  duration: string
  viewers: number
  thumbnail: string
  status: 'upcoming' | 'live' | 'ended'
  category: string
}

export interface Investment {
  id: string
  projectTitle: string
  amount: number
  date: string
  status: 'active' | 'completed' | 'pending'
  currentValue: number
  return: number
  returnPercentage: number
}

export const investmentData = {
  opportunities: [
    {
      id: '1',
      title: 'Plateforme E-learning IA',
      description: 'Révolutionnez l\'apprentissage avec une plateforme alimentée par l\'intelligence artificielle',
      creator: {
        name: 'Dr. Jean Dupont',
        avatar: '/avatars/jean.jpg',
        verified: true
      },
      targetAmount: 50000,
      currentAmount: 32500,
      minimumInvestment: 100,
      expectedReturn: 15,
      duration: '18 mois',
      category: 'EdTech',
      riskLevel: 'medium' as const,
      thumbnail: '/investments/ai-platform.jpg',
      tags: ['IA', 'EdTech', 'Innovation'],
      deadline: '2024-02-15',
      investors: 45
    },
    {
      id: '2',
      title: 'Cours de Marketing Digital',
      description: 'Série complète de cours pour maîtriser le marketing digital moderne',
      creator: {
        name: 'Sarah Martin',
        avatar: '/avatars/sarah.jpg',
        verified: true
      },
      targetAmount: 25000,
      currentAmount: 18750,
      minimumInvestment: 50,
      expectedReturn: 12,
      duration: '12 mois',
      category: 'Marketing',
      riskLevel: 'low' as const,
      thumbnail: '/investments/marketing-course.jpg',
      tags: ['Marketing', 'Digital', 'Formation'],
      deadline: '2024-01-30',
      investors: 67
    },
    {
      id: '3',
      title: 'Studio de Création Vidéo',
      description: 'Équipement professionnel pour créer des contenus vidéo éducatifs de qualité',
      creator: {
        name: 'Marie Dubois',
        avatar: '/avatars/marie.jpg',
        verified: true
      },
      targetAmount: 75000,
      currentAmount: 23000,
      minimumInvestment: 200,
      expectedReturn: 18,
      duration: '24 mois',
      category: 'Production',
      riskLevel: 'high' as const,
      thumbnail: '/investments/video-studio.jpg',
      tags: ['Vidéo', 'Production', 'Studio'],
      deadline: '2024-03-01',
      investors: 28
    }
  ] as InvestmentOpportunity[],

  livePitches: [
    {
      id: '1',
      title: 'Révolution de l\'Apprentissage Mobile',
      presenter: 'Ahmed Ben Ali',
      description: 'Découvrez comment notre app mobile transforme l\'apprentissage',
      startTime: '2024-01-20T14:00:00Z',
      duration: '30 min',
      viewers: 156,
      thumbnail: '/pitches/mobile-learning.jpg',
      status: 'live' as const,
      category: 'Mobile'
    },
    {
      id: '2',
      title: 'IA et Personnalisation Éducative',
      presenter: 'Lisa Chen',
      description: 'L\'avenir de l\'éducation personnalisée grâce à l\'IA',
      startTime: '2024-01-22T16:00:00Z',
      duration: '45 min',
      viewers: 0,
      thumbnail: '/pitches/ai-education.jpg',
      status: 'upcoming' as const,
      category: 'IA'
    }
  ] as LivePitch[],

  portfolio: [
    {
      id: '1',
      projectTitle: 'Cours React Avancé',
      amount: 500,
      date: '2023-12-01',
      status: 'active' as const,
      currentValue: 575,
      return: 75,
      returnPercentage: 15
    },
    {
      id: '2',
      projectTitle: 'Plateforme Design UX',
      amount: 1000,
      date: '2023-11-15',
      status: 'completed' as const,
      currentValue: 1120,
      return: 120,
      returnPercentage: 12
    },
    {
      id: '3',
      projectTitle: 'Bootcamp IA',
      amount: 750,
      date: '2024-01-10',
      status: 'pending' as const,
      currentValue: 750,
      return: 0,
      returnPercentage: 0
    }
  ] as Investment[]
} 