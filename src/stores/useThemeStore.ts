import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  isDark: boolean
  
  // Actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return
  
  const isDark = theme === 'system' ? getSystemTheme() : theme === 'dark'
  
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  return isDark
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDark: false,

      setTheme: (theme: Theme) => {
        const isDark = applyTheme(theme)
        set({ theme, isDark })
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'ayan-theme-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const isDark = applyTheme(state.theme)
          state.isDark = isDark
        }
      },
    }
  )
) 