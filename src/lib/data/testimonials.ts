export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Martin',
    role: 'Étudiante en Marketing',
    avatar: '/avatars/sarah.jpg',
    content: 'Ayan Bridge V2 a transformé ma façon d\'apprendre. Les cours sont interactifs et les outils IA m\'aident à créer du contenu de qualité.',
    rating: 5,
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Ahmed Ben Ali',
    role: 'Développeur Full Stack',
    avatar: '/avatars/ahmed.jpg',
    content: 'Une plateforme exceptionnelle ! J\'ai pu monétiser mes compétences tout en continuant à apprendre. La communauté est très active.',
    rating: 5,
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Marie Dubois',
    role: 'Formatrice en ligne',
    avatar: '/avatars/marie.jpg',
    content: 'Le studio IA est révolutionnaire. Je peux créer des cours professionnels en quelques heures au lieu de plusieurs jours.',
    rating: 4,
    date: '2024-01-08'
  },
  {
    id: '4',
    name: 'Karim Hassani',
    role: 'Investisseur',
    avatar: '/avatars/karim.jpg',
    content: 'Bridge Capital m\'a permis d\'investir dans l\'éducation avec des retours intéressants. Transparence totale sur les projets.',
    rating: 5,
    date: '2024-01-05'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    role: 'Designer UX/UI',
    avatar: '/avatars/lisa.jpg',
    content: 'L\'interface est intuitive et moderne. J\'adore les fonctionnalités collaboratives et les sessions live.',
    rating: 4,
    date: '2024-01-03'
  },
  {
    id: '6',
    name: 'Omar Benali',
    role: 'Entrepreneur',
    avatar: '/avatars/omar.jpg',
    content: 'Ayan Bridge V2 m\'a aidé à développer mes compétences en business. Les mentors sont excellents et très accessibles.',
    rating: 5,
    date: '2024-01-01'
  }
] 