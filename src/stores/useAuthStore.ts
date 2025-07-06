import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'creator' | 'investor' | 'admin'
  createdAt: string
  lastLogin: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => Promise<void>
  updateProfile: (updates: Partial<User>) => void
  clearError: () => void
}

// Mock user data pour la démo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@ayanbridge.com',
    name: 'Demo User',
    avatar: '/avatars/demo.jpg',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'creator@ayanbridge.com',
    name: 'Demo Creator',
    avatar: '/avatars/creator.jpg',
    role: 'creator',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'investor@ayanbridge.com',
    name: 'Demo Investor',
    avatar: '/avatars/investor.jpg',
    role: 'investor',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user = mockUsers.find(u => u.email === email)
        
        if (user && password === 'demo123') {
          set({
            user: { ...user, lastLogin: new Date().toISOString() },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } else {
          set({
            isLoading: false,
            error: 'Email ou mot de passe incorrect',
          })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      },

      updateProfile: (updates) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...updates },
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'ayan-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
) 