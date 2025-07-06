import React from 'react'
import { motion } from 'framer-motion'
import { 
  BeakerIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShareIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { DataLabProject } from '@/lib/data/dashboard'
import Button from '@/components/ui/Button'

interface DataLabCardProps {
  projects: DataLabProject[]
  onOpenProject?: (projectId: string) => void
  onViewAll?: () => void
}

const DataLabCard: React.FC<DataLabCardProps> = ({ projects, onOpenProject, onViewAll }) => {
  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'notebook':
        return <DocumentTextIcon className="w-4 h-4" />
      case 'dataset':
        return <ChartBarIcon className="w-4 h-4" />
      case 'model':
        return <CpuChipIcon className="w-4 h-4" />
      case 'analysis':
        return <BeakerIcon className="w-4 h-4" />
      default:
        return <DocumentTextIcon className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
      case 'termine':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'partage':
        return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20'
      case 'brouillon':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
      default:
        return 'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_cours':
        return <PlayIcon className="w-3 h-3" />
      case 'termine':
        return <CheckCircleIcon className="w-3 h-3" />
      case 'partage':
        return <ShareIcon className="w-3 h-3" />
      default:
        return <DocumentTextIcon className="w-3 h-3" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'En cours'
      case 'termine':
        return 'Terminé'
      case 'partage':
        return 'Partagé'
      case 'brouillon':
        return 'Brouillon'
      default:
        return status
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 24) return `Il y a ${hours}h`
    if (days === 1) return 'Hier'
    return `Il y a ${days} jours`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'text-green-600'
      case 'Intermédiaire':
        return 'text-blue-600'
      case 'Avancé':
        return 'text-orange-600'
      default:
        return 'text-neutral-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
            <BeakerIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              DataLab & Projets
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Vos analyses et modèles
            </p>
          </div>
        </div>
        <Button
          onClick={onViewAll}
          variant="ghost"
          size="sm"
          icon={<ArrowRightIcon className="w-4 h-4" />}
        >
          Voir tout
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onOpenProject?.(project.id)}
            className="group p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 cursor-pointer hover:shadow-md"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                  {getProjectTypeIcon(project.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h4>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span>{getStatusLabel(project.status)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                    {project.description}
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
            </div>

            {/* Project Details */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-neutral-600 dark:text-neutral-400">
                  {project.technology}
                </span>
                <span className={`font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-400">
                  <ClockIcon className="w-3 h-3" />
                  <span>{project.estimatedTime}</span>
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {formatTimeAgo(project.lastModified)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<DocumentTextIcon className="w-4 h-4" />}
          >
            Nouveau notebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<BeakerIcon className="w-4 h-4" />}
          >
            Importer dataset
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default DataLabCard