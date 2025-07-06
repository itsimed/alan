# Ayan Bridge V2 🚀

Plateforme éducative et collaborative de nouvelle génération construite avec React 19, Tailwind CSS et Framer Motion.

## 🎯 Vue d'ensemble

Ayan Bridge V2 est une plateforme complète qui combine :
- **Marketplace** de produits numériques éducatifs
- **Studio IA** pour la création assistée par intelligence artificielle
- **Learn Hub** avec cours et sessions live
- **Bridge Capital** pour l'investissement dans l'éducation
- **Dashboard** utilisateur unifié

## 🛠️ Stack Technique

### Frontend
- **React 19** - Framework principal avec hooks modernes
- **TypeScript** - Typage statique pour la robustesse
- **Vite** - Build tool ultra-rapide
- **React Router DOM** - Navigation entre les pages

### Styling & UI
- **Tailwind CSS 3.4** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides et performantes
- **Heroicons** - Icônes SVG modernes
- **Lucide React** - Icônes supplémentaires

### State Management & Internationalisation
- **Zustand** - Gestion d'état légère et performante
- **i18next** - Internationalisation complète (FR/EN/AR)
- **React i18next** - Intégration React

### Outils de développement
- **ESLint** - Linting du code
- **PostCSS** - Post-processing CSS
- **Autoprefixer** - Préfixes CSS automatiques

## 🏗️ Architecture

```
src/
├── app/                      # Point d'entrée principal
├── components/               # Composants réutilisables
│   ├── ui/                   # Composants UI de base
│   └── layout/               # Layouts et navigation
├── pages/                    # Pages de l'application
├── stores/                   # Stores Zustand
├── contexts/                 # Contextes React
├── hooks/                    # Custom hooks
├── lib/                      # Utilitaires et configuration
├── locales/                  # Fichiers de traduction
├── styles/                   # Styles globaux
└── assets/                   # Ressources statiques
```

## 🎨 Design System

### Couleurs
- **Primary** : Bleu nuit (#172554) - Couleur principale
- **Secondary** : Orange dynamique (#431407) - Accents
- **Neutral** : Gris clair (#0a0a0a) - Textes et arrière-plans

### Typographie
- **Inter** - Police principale (latin)
- **Noto Sans Arabic** - Police pour l'arabe

### Composants
- Boutons avec variantes (primary, secondary, outline, ghost)
- Cards avec effets hover et glassmorphism
- Inputs avec validation et icônes
- Badges et indicateurs de statut

## 🌍 Internationalisation

Support complet pour 3 langues :
- **Français** (FR) - Langue par défaut
- **Anglais** (EN) - Support international
- **Arabe** (AR) - Support RTL

Détection automatique de la langue du navigateur avec fallback.

## 🔐 Authentification

Système d'authentification simulé avec Zustand :
- Login/Logout avec persistance
- Rôles utilisateur (user, creator, investor, admin)
- Gestion des sessions
- Mock data pour la démo

### Comptes de démonstration
- `demo@ayanbridge.com` / `demo123` - Utilisateur standard
- `creator@ayanbridge.com` / `demo123` - Créateur de contenu
- `investor@ayanbridge.com` / `demo123` - Investisseur

## 📱 Responsive Design

Design mobile-first avec breakpoints :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd ayan-bridge-v2

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Scripts disponibles
```bash
npm run dev          # Démarrage du serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Linting du code
```

## 📂 Structure des Pages

### Pages Publiques
- **Home** (`/home`) - Page d'accueil avec présentation
- **Marketplace** (`/marketplace`) - Catalogue de produits
- **Studio** (`/studio`) - Outils de création IA
- **Learn Hub** (`/learnhub`) - Cours et sessions
- **Capital** (`/capital`) - Opportunités d'investissement

### Dashboard Utilisateur
- **Dashboard** (`/dashboard`) - Vue d'ensemble
- **Profile** (`/dashboard/profile`) - Gestion du profil
- **Purchases** (`/dashboard/purchases`) - Historique d'achats
- **Revenues** (`/dashboard/revenues`) - Gestion des revenus
- **Settings** (`/dashboard/settings`) - Paramètres

## 🎭 Animations

Animations fluides avec Framer Motion :
- **Page transitions** - Transitions entre les pages
- **Scroll animations** - Animations au scroll
- **Hover effects** - Effets au survol
- **Loading states** - États de chargement

## 🌙 Mode Sombre

Support complet du mode sombre :
- Détection automatique des préférences système
- Toggle manuel
- Persistance des préférences
- Thème adaptatif pour tous les composants

## 🔧 Configuration

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.js` :
- Couleurs du design system
- Animations personnalisées
- Support RTL
- Breakpoints responsives

### Vite
Configuration dans `vite.config.ts` :
- Alias de chemins
- Plugin React
- Serveur de développement

### TypeScript
Configuration stricte dans `tsconfig.json` :
- Path mapping
- Strict mode
- JSX support

## 📦 Déploiement

### Build de production
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

### Variables d'environnement
Créer un fichier `.env.local` :
```env
VITE_APP_NAME=Ayan Bridge V2
VITE_APP_VERSION=1.0.0
```

## 🤝 Contribution

### Guidelines
1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de code
- TypeScript strict
- ESLint configuration
- Prettier pour le formatage
- Tests unitaires (à implémenter)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

## 🗺️ Roadmap

### Phase 1 (Actuelle)
- ✅ Structure de base
- ✅ Composants UI
- ✅ Navigation
- ✅ Pages principales
- ✅ Authentification simulée

### Phase 2 (Prévue)
- 🔄 Backend API
- 🔄 Authentification réelle
- 🔄 Base de données
- 🔄 Paiements

### Phase 3 (Future)
- 📋 IA intégrée
- 📋 Chat en temps réel
- 📋 Notifications push
- 📋 Mobile app

---

**Développé avec ❤️ par l'équipe Ayan Bridge** 