// Routes principales de l'application Ayan Bridge V2
export const ROUTES = {
  // Pages publiques
  HOME: '/home',
  MARKETPLACE: '/marketplace',
  STUDIO: '/studio',
  LEARN_HUB: '/learnhub',
  CAPITAL: '/capital',
  
  // Dashboard utilisateur
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_PURCHASES: '/dashboard/purchases',
  DASHBOARD_REVENUES: '/dashboard/revenues',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  
  // Auth (pour future implémentation)
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const

// Navigation principale
export const MAIN_NAVIGATION = [
  {
    path: ROUTES.HOME,
    label: 'nav.home',
    icon: 'HomeIcon',
  },
  {
    path: ROUTES.MARKETPLACE,
    label: 'nav.marketplace',
    icon: 'ShoppingBagIcon',
  },
  {
    path: ROUTES.STUDIO,
    label: 'nav.studio',
    icon: 'SparklesIcon',
  },
  {
    path: ROUTES.LEARN_HUB,
    label: 'nav.learnHub',
    icon: 'AcademicCapIcon',
  },
  {
    path: ROUTES.CAPITAL,
    label: 'nav.capital',
    icon: 'CurrencyDollarIcon',
  },
] as const

// Navigation dashboard
export const DASHBOARD_NAVIGATION = [
  {
    path: ROUTES.DASHBOARD,
    label: 'dashboard.overview',
    icon: 'ChartBarIcon',
  },
  {
    path: ROUTES.DASHBOARD_PROFILE,
    label: 'dashboard.profile',
    icon: 'UserIcon',
  },
  {
    path: ROUTES.DASHBOARD_PURCHASES,
    label: 'dashboard.purchases',
    icon: 'ShoppingCartIcon',
  },
  {
    path: ROUTES.DASHBOARD_REVENUES,
    label: 'dashboard.revenues',
    icon: 'BanknotesIcon',
  },
  {
    path: ROUTES.DASHBOARD_SETTINGS,
    label: 'dashboard.settings',
    icon: 'Cog6ToothIcon',
  },
] as const 