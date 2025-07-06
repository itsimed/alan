import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  HomeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-neutral-900 dark:text-white mb-2">
              404
            </h1>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              Page non trouvée
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="outline"
              icon={<ArrowLeftIcon className="w-4 h-4" />}
              onClick={() => window.history.back()}
            >
              Retour
            </Button>
            <Button
              variant="primary"
              icon={<HomeIcon className="w-4 h-4" />}
            >
              <Link to="/home">
                Accueil
              </Link>
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Vous pouvez aussi essayer :
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/marketplace"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                to="/studio"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Studio IA
              </Link>
              <Link
                to="/learnhub"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Learn Hub
              </Link>
              <Link
                to="/capital"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Bridge Capital
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage 