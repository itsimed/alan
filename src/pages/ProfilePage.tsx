import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  UserIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PencilIcon,
  TrophyIcon,
  CalendarDaysIcon,
  ClockIcon,
  StarIcon,
  BookOpenIcon,
  CertificateIcon,
  BoltIcon,
  PhotoIcon,
  KeyIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { currentUser } from '@/lib/data/dashboardData'

const ProfilePage: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'certificates' | 'activity' | 'edit'>('overview')
  const [profileData, setProfileData] = useState({
    firstName: currentUser.name.split(' ')[0],
    lastName: currentUser.name.split(' ')[1] || '',
    email: currentUser.email,
    avatar: currentUser.avatar || '',
    bio: 'Passionné par le développement web et l\'apprentissage continu. J\'aime partager mes connaissances et découvrir de nouvelles technologies.',
    location: 'Paris, France',
    website: '',
    linkedin: '',
    github: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState<'profile' | 'security'>('profile')

  // Mock data pour le profil
  const profileStats = {
    coursesCompleted: 12,
    hoursLearned: 156,
    certificatesEarned: 5,
    currentStreak: 7,
    rank: 'Avancé',
    points: 2450
  }

  const recentCourses = [
    {
      id: 1,
      title: 'React 19 & Next.js 14',
      progress: 85,
      lastAccessed: '2024-01-15',
      difficulty: 'Intermédiaire'
    },
    {
      id: 2,
      title: 'TypeScript Avancé',
      progress: 100,
      lastAccessed: '2024-01-10',
      difficulty: 'Avancé',
      completed: true
    },
    {
      id: 3,
      title: 'Design UX/UI avec Figma',
      progress: 45,
      lastAccessed: '2024-01-12',
      difficulty: 'Débutant'
    }
  ]

  const certificates = [
    {
      id: 1,
      title: 'Développeur React Certifié',
      issuer: 'Ayan Academy',
      date: '2024-01-01',
      level: 'Expert',
      verified: true
    },
    {
      id: 2,
      title: 'Spécialiste TypeScript',
      issuer: 'Ayan Academy',
      date: '2023-12-15',
      level: 'Avancé',
      verified: true
    },
    {
      id: 3,
      title: 'Designer UX/UI',
      issuer: 'Ayan Academy',
      date: '2023-11-20',
      level: 'Intermédiaire',
      verified: true
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: ChartBarIcon },
    { id: 'courses', label: 'Mes Cours', icon: BookOpenIcon },
    { id: 'certificates', label: 'Certificats', icon: AcademicCapIcon },
    { id: 'activity', label: 'Activité', icon: ClockIcon },
    { id: 'edit', label: 'Modifier le profil', icon: PencilIcon }
  ]

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    console.log('Sauvegarde du profil:', profileData)
    setIsEditing(false)
  }

  const handleSavePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    console.log('Changement de mot de passe')
    setProfileData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }))
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header Profile */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                <span className="text-4xl font-bold text-white">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                <PencilIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
              <p className="text-primary-100 text-lg mb-4">{currentUser.role}</p>
              <p className="text-primary-200 mb-6">{currentUser.email}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{profileStats.coursesCompleted}</div>
                  <div className="text-primary-200 text-sm">Cours terminés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profileStats.hoursLearned}h</div>
                  <div className="text-primary-200 text-sm">Heures d'apprentissage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profileStats.certificatesEarned}</div>
                  <div className="text-primary-200 text-sm">Certificats</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profileStats.points}</div>
                  <div className="text-primary-200 text-sm">Points XP</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <Button 
                variant="secondary" 
                icon={<PencilIcon className="w-4 h-4" />}
                onClick={() => setActiveTab('edit')}
              >
                Modifier le profil
              </Button>
              <Button variant="outline" icon={<Cog6ToothIcon className="w-4 h-4" />}>
                Paramètres
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                      Progression Récente
                    </h2>
                    <div className="space-y-4">
                      {recentCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-neutral-900 dark:text-white">
                              {course.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {course.difficulty} • Dernière activité: {course.lastAccessed}
                            </p>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-neutral-600 dark:text-neutral-400">
                                  Progression
                                </span>
                                <span className="text-neutral-900 dark:text-white font-medium">
                                  {course.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    course.completed ? 'bg-green-500' : 'bg-primary-600'
                                  }`}
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          {course.completed && (
                            <TrophyIcon className="w-6 h-6 text-yellow-500 ml-4" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Learning Streak */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        Série d'apprentissage
                      </h2>
                      <div className="flex items-center space-x-2 text-orange-600">
                        <BoltIcon className="w-5 h-5" />
                        <span className="font-bold">{profileStats.currentStreak} jours</span>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      Continuez votre série ! Vous apprenez depuis {profileStats.currentStreak} jours consécutifs.
                    </p>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`h-8 rounded flex items-center justify-center text-xs font-medium ${
                            i < profileStats.currentStreak
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                              : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Rank & Level */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrophyIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Niveau {profileStats.rank}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {profileStats.points} points XP
                    </p>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
                        style={{ width: '75%' }}
                      />
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      550 XP jusqu'au niveau Expert
                    </p>
                  </Card>
                </motion.div>

                {/* Recent Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                      Réalisations Récentes
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <AcademicCapIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white text-sm">
                            Cours TypeScript terminé
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Il y a 5 jours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white text-sm">
                            Série de 7 jours
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Aujourd'hui
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AcademicCapIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                      Obtenu le {new Date(cert.date).toLocaleDateString('fr-FR')}
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cert.level === 'Expert' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        cert.level === 'Avancé' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {cert.level}
                      </span>
                      {cert.verified && (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                          ✓ Vérifié
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Edit Profile Tab */}
          {activeTab === 'edit' && (
            <div className="max-w-4xl mx-auto">
              {/* Navigation for Edit Sections */}
              <div className="flex space-x-1 mb-8 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === 'profile'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Informations personnelles
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === 'security'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Sécurité
                </button>
              </div>

              {/* Profile Information Section */}
              {activeSection === 'profile' && (
                <Card>
                  <div className="flex items-center space-x-4 mb-8">
                    <UserIcon className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Informations personnelles
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {profileData.firstName.charAt(0)}
                          </span>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center hover:bg-secondary-700 transition-colors">
                          <PhotoIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                          Photo de profil
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                          Ajoutez une photo pour personaliser votre profil
                        </p>
                        <div className="flex space-x-3">
                          <Button size="sm" variant="outline">
                            Changer
                          </Button>
                          <Button size="sm" variant="ghost">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Personal Information Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Prénom
                        </label>
                        <Input
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Nom
                        </label>
                        <Input
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          icon={<EnvelopeIcon className="w-4 h-4" />}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Biographie
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                          placeholder="Parlez-nous de vous..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Localisation
                        </label>
                        <Input
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Ville, Pays"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Site web
                        </label>
                        <Input
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://votre-site.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          LinkedIn
                        </label>
                        <Input
                          value={profileData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/votre-profil"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          GitHub
                        </label>
                        <Input
                          value={profileData.github}
                          onChange={(e) => handleInputChange('github', e.target.value)}
                          placeholder="https://github.com/votre-username"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                      <Button variant="outline" onClick={() => setActiveTab('overview')}>
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <Card>
                  <div className="flex items-center space-x-4 mb-8">
                    <KeyIcon className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Sécurité
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Password Change Form */}
                    <div className="max-w-md">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                        Changer le mot de passe
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Mot de passe actuel
                          </label>
                          <Input
                            type="password"
                            value={profileData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Nouveau mot de passe
                          </label>
                          <Input
                            type="password"
                            value={profileData.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <Input
                            type="password"
                            value={profileData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 pt-6">
                        <Button variant="outline">
                          Annuler
                        </Button>
                        <Button onClick={handleSavePassword}>
                          Changer le mot de passe
                        </Button>
                      </div>
                    </div>

                    {/* Security Options */}
                    <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                        Options de sécurité
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">
                              Authentification à deux facteurs
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Renforcez la sécurité de votre compte
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Activer
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">
                              Sessions actives
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              Gérez vos sessions de connexion
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir les sessions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Autres tabs à implémenter */}
          {activeTab === 'courses' && (
            <div className="text-center py-12">
              <BookOpenIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                Mes Cours
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Cette section sera développée prochainement.
              </p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-center py-12">
              <ClockIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                Historique d'Activité
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Cette section sera développée prochainement.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProfilePage 