import { Routes, Route, Navigate } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import i18n from './lib/i18n'

// Layouts
import MainLayout from './components/layout/MainLayout'
import DashboardLayout from './components/layout/DashboardLayout'

// Pages
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import StudioPage from './pages/StudioPage'
import LearnHubPage from './pages/LearnHubPage'
import CapitalPage from './pages/CapitalPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Redirection par défaut vers /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Routes principales avec MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="studio" element={<StudioPage />} />
              <Route path="learnhub" element={<LearnHubPage />} />
              <Route path="capital" element={<CapitalPage />} />
            </Route>
            
            {/* Route dashboard avec DashboardLayout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
            </Route>
            
            {/* Page 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default App 