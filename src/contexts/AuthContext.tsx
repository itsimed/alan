import React, { createContext, useContext } from 'react'
import { useAuthStore } from '@stores/useAuthStore'

interface AuthContextType {
  user: {
    id: string
    email: string
    name: string
    avatar?: string
    role: 'user' | 'creator' | 'investor' | 'admin'
    createdAt: string
    lastLogin: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
  updateProfile: (updates: any) => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = useAuthStore()

  const value: AuthContextType = {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    login: authStore.login,
    logout: authStore.logout,
    register: authStore.register,
    updateProfile: authStore.updateProfile,
    clearError: authStore.clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 