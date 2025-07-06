import React from 'react'
import UserCard from '../../components/dashboard/UserCard'
import UserStatGraph from '../../components/dashboard/UserStatGraph'
import CertificateCard from '../../components/dashboard/CertificateCard'
import NotificationBadge from '../../components/dashboard/NotificationBadge'
import { userData } from '../../lib/data/user'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Tableau de bord
            </h1>
            <NotificationBadge count={3} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <UserCard user={userData.profile} />
            
            {/* Certificates */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Mes certificats</h3>
              <div className="space-y-4">
                {userData.certificates.map((certificate, index) => (
                  <CertificateCard key={index} {...certificate} />
                ))}
              </div>
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Cours complétés
                </h3>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {userData.stats.coursesCompleted}
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Revenus générés
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {userData.stats.revenue}€
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Investissements
                </h3>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {userData.stats.investments}€
                </p>
              </div>
            </div>

            {/* Activity Graph */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4">Activité</h3>
              <UserStatGraph data={userData.activityData} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'course' ? 'bg-blue-500' :
                      activity.type === 'purchase' ? 'bg-green-500' :
                      activity.type === 'investment' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900 dark:text-neutral-100">
                        {activity.description}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 