import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 