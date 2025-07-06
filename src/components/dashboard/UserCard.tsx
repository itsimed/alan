'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckBadgeIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline'
import { UserProfile } from '@/lib/data/user'

interface UserCardProps {
  user: UserProfile
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700"
    >
      {/* Avatar and Basic Info */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
          {user.name.charAt(0)}
        </div>
        
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            {user.name}
          </h2>
          {user.verified && (
            <CheckBadgeIcon className="w-5 h-5 text-blue-500 ml-2" />
          )}
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">
          {user.email}
        </p>
        
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          user.role === 'creator' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : user.role === 'investor'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {user.role === 'creator' ? 'Créateur' : 
           user.role === 'investor' ? 'Investisseur' : 
           user.role === 'student' ? 'Étudiant' : 'Admin'}
        </span>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
          À propos
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {user.bio}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {user.location}
        </div>
        
        {user.website && (
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <GlobeAltIcon className="w-4 h-4 mr-2" />
            <a 
              href={user.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {user.website.replace('https://', '')}
            </a>
          </div>
        )}
        
        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Membre depuis {new Date(user.joinDate).toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long' 
          })}
        </div>
      </div>

      {/* Social Links */}
      {(user.socialLinks.twitter || user.socialLinks.linkedin || user.socialLinks.github) && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
            Réseaux sociaux
          </h3>
          <div className="flex space-x-3">
            {user.socialLinks.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-xs font-bold">T</span>
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-xs font-bold">GH</span>
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UserCard 