import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  HeartIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Ayan Bridge V2</span>
            </div>
            <p className="text-neutral-300 mb-4 max-w-md">
              Plateforme éducative et collaborative de nouvelle génération. 
              Découvrez l'avenir de l'apprentissage avec nos outils innovants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <GlobeAltIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <EnvelopeIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <PhoneIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-neutral-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-neutral-300 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/studio" className="text-neutral-300 hover:text-white transition-colors">
                  Studio IA
                </Link>
              </li>
              <li>
                <Link to="/learnhub" className="text-neutral-300 hover:text-white transition-colors">
                  Learn Hub
                </Link>
              </li>
              <li>
                <Link to="/capital" className="text-neutral-300 hover:text-white transition-colors">
                  Bridge Capital
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Communauté
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Ayan Bridge V2. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Politique de confidentialité
              </a>
              <span className="text-neutral-400 text-sm flex items-center">
                Fait avec <HeartIcon className="w-4 h-4 mx-1 text-red-500" /> par l'équipe Ayan
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 