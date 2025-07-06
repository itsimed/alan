import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { DASHBOARD_NAVIGATION } from '@/lib/routes'
import Button from '@/components/ui/Button'

const DashboardLayout: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    logout()
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      HomeIcon: <HomeIcon className="w-5 h-5" />,
      UserIcon: <UserIcon className="w-5 h-5" />,
      ShoppingCartIcon: <ShoppingCartIcon className="w-5 h-5" />,
      BanknotesIcon: <BanknotesIcon className="w-5 h-5" />,
      Cog6ToothIcon: <Cog6ToothIcon className="w-5 h-5" />,
      ChartBarIcon: <ChartBarIcon className="w-5 h-5" />,
    }
    return icons[iconName] || <HomeIcon className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">
                Dashboard
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<XMarkIcon className="w-5 h-5" />}
              onClick={toggleSidebar}
              className="md:hidden"
            />
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {user?.name || 'Utilisateur'}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {DASHBOARD_NAVIGATION.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-700'
                }`}
              >
                {getIcon(item.icon)}
                <span>{t(item.label)}</span>
              </a>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {t('nav.logout')}
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              icon={<Bars3Icon className="w-5 h-5" />}
              onClick={toggleSidebar}
              className="md:hidden"
            />
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {DASHBOARD_NAVIGATION.find(item => item.path === location.pathname)?.label 
                ? t(DASHBOARD_NAVIGATION.find(item => item.path === location.pathname)!.label)
                : t('dashboard.overview')
              }
            </h1>
            <div className="flex items-center space-x-4">
              {/* Notifications, etc. */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout 