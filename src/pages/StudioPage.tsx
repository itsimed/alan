import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  SparklesIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  ChartBarIcon,
  PlusIcon,
  BookOpenIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CodeBracketIcon,
  PresentationChartLineIcon,
  RocketLaunchIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ArrowsPointingOutIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  BoltIcon,
  FireIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  TrashIcon,
  ArrowPathIcon,
  SpeakerWaveIcon,
  CameraIcon,
  DocumentIcon,
  CommandLineIcon,
  BeakerIcon,
  GlobeAltIcon,
  PuzzlePieceIcon,
  CogIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import StudioSidebar from '@/components/studio/StudioSidebar'
import ChatMessage from '@/components/studio/ChatMessage'
import ChatInput from '@/components/studio/ChatInput'

// Hook pour détecter la taille d'écran
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    ...screenSize,
    isMobile: screenSize.width < 768,
    isTablet: screenSize.width >= 768 && screenSize.width < 1024,
    isDesktop: screenSize.width >= 1024
  }
}

interface ChatMessageType {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  attachments?: any[]
  aiThinking?: boolean
  suggestions?: string[]
  actions?: Array<{
    id: string
    label: string
    icon: React.ReactNode
    action: () => void
  }>
}

interface Template {
  id: string
  title: string
  description: string
  category: string
  icon: React.ReactNode
  color: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface Project {
  id: string
  title: string
  type: string
  lastModified: Date
  thumbnail?: string
  progress: number
  status: 'draft' | 'in-progress' | 'completed' | 'published'
}

interface AIState {
  isThinking: boolean
  thinkingType: 'analyzing' | 'generating' | 'optimizing' | 'creating'
  progress: number
  currentTask: string
}

const StudioPage: React.FC = () => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isDesktop } = useScreenSize()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarTab, setSidebarTab] = useState('conversations')
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'ai',
      content: "🎨 Bonjour ! Je suis votre assistant IA créatif. Je peux vous aider à créer du contenu éducatif exceptionnel. Que souhaitez-vous créer aujourd'hui ?",
      timestamp: new Date(),
      suggestions: [
        "Créer un cours interactif",
        "Générer un quiz intelligent", 
        "Concevoir une présentation",
        "Rédiger un tutoriel"
      ]
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [aiState, setAiState] = useState<AIState>({
    isThinking: false,
    thinkingType: 'analyzing',
    progress: 0,
    currentTask: ''
  })
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(isDesktop)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Motion values for AI animations
  const thinkingProgress = useMotionValue(0)
  const thinkingScale = useTransform(thinkingProgress, [0, 100], [0.8, 1.2])
  const thinkingOpacity = useTransform(thinkingProgress, [0, 50, 100], [0.3, 1, 0.3])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (aiState.isThinking) {
      const interval = setInterval(() => {
        thinkingProgress.set(aiState.progress)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [aiState.isThinking, aiState.progress, thinkingProgress])

  // Mettre à jour showPreview quand la taille d'écran change
  useEffect(() => {
    setShowPreview(isDesktop)
  }, [isDesktop])

  const templates: Template[] = [
    {
      id: 'course-outline',
      title: 'Plan de Cours Interactif',
      description: 'Créez un plan détaillé avec objectifs, modules et évaluations',
      category: 'Éducation',
      icon: <BookOpenIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      tags: ['cours', 'éducation', 'planification'],
      difficulty: 'beginner'
    },
    {
      id: 'quiz-generator',
      title: 'Générateur de Quiz IA',
      description: 'Quiz adaptatifs avec questions intelligentes et feedback personnalisé',
      category: 'Évaluation',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      tags: ['quiz', 'évaluation', 'IA'],
      difficulty: 'intermediate'
    },
    {
      id: 'presentation',
      title: 'Présentation Dynamique',
      description: 'Slides interactives avec animations et transitions fluides',
      category: 'Présentation',
      icon: <PresentationChartLineIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      tags: ['présentation', 'slides', 'animation'],
      difficulty: 'beginner'
    },
    {
      id: 'infographic',
      title: 'Infographie Intelligente',
      description: 'Visualisations de données avec IA et graphiques interactifs',
      category: 'Visuel',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      tags: ['infographie', 'données', 'visualisation'],
      difficulty: 'intermediate'
    },
    {
      id: 'video-script',
      title: 'Script Vidéo IA',
      description: 'Scripts optimisés avec timing, transitions et recommandations',
      category: 'Vidéo',
      icon: <VideoCameraIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-red-500 to-pink-500',
      tags: ['vidéo', 'script', 'timing'],
      difficulty: 'intermediate'
    },
    {
      id: 'coding-tutorial',
      title: 'Tutoriel Code Interactif',
      description: 'Tutoriels avec code live, tests et exercices pratiques',
      category: 'Technique',
      icon: <CodeBracketIcon className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      tags: ['code', 'programmation', 'tutoriel'],
      difficulty: 'advanced'
    }
  ]

  const recentProjects: Project[] = [
    {
      id: '1',
      title: 'Introduction à React 19',
      type: 'Cours',
      lastModified: new Date('2024-01-15'),
      progress: 85,
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Quiz JavaScript Avancé',
      type: 'Quiz',
      lastModified: new Date('2024-01-14'),
      progress: 100,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Présentation TypeScript',
      type: 'Présentation',
      lastModified: new Date('2024-01-13'),
      progress: 60,
      status: 'draft'
    }
  ]

  const aiTools = [
    { 
      id: 'brain', 
      name: 'Brain Boost', 
      description: 'Optimisation cognitive du contenu',
      icon: <CogIcon className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      action: () => handleAITool('brain')
    },
    { 
      id: 'cpu', 
      name: 'Smart Analysis', 
      description: 'Analyse intelligente des données',
      icon: <CpuChipIcon className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      action: () => handleAITool('cpu')
    },
    { 
      id: 'bolt', 
      name: 'Quick Generate', 
      description: 'Génération rapide de contenu',
      icon: <BoltIcon className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      action: () => handleAITool('bolt')
    },
    { 
      id: 'fire', 
      name: 'Creative Spark', 
      description: 'Inspiration créative IA',
      icon: <FireIcon className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      action: () => handleAITool('fire')
    }
  ]

  const quickActions = [
    { 
      icon: <DocumentTextIcon className="w-5 h-5" />, 
      label: 'Texte', 
      action: () => insertContent('text'),
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <PhotoIcon className="w-5 h-5" />, 
      label: 'Image', 
      action: () => insertContent('image'),
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: <VideoCameraIcon className="w-5 h-5" />, 
      label: 'Vidéo', 
      action: () => insertContent('video'),
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <MicrophoneIcon className="w-5 h-5" />, 
      label: 'Audio', 
      action: () => insertContent('audio'),
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: <ChartBarIcon className="w-5 h-5" />, 
      label: 'Graphique', 
      action: () => insertContent('chart'),
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Simulate AI thinking with different states
    await simulateAIThinking()
    
    const aiResponse: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: generateAIResponse(newMessage),
      timestamp: new Date(),
      suggestions: generateSuggestions(newMessage),
      actions: generateActions(newMessage)
    }
    
    setMessages(prev => [...prev, aiResponse])
  }

  const simulateAIThinking = async () => {
    const thinkingStates = [
      { type: 'analyzing', task: 'Analyse de votre demande...', duration: 800 },
      { type: 'generating', task: 'Génération de contenu...', duration: 1200 },
      { type: 'optimizing', task: 'Optimisation du résultat...', duration: 600 }
    ]

    for (const state of thinkingStates) {
      setAiState({
        isThinking: true,
        thinkingType: state.type as any,
        progress: 0,
        currentTask: state.task
      })

      // Animate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, state.duration / 10))
        setAiState(prev => ({ ...prev, progress: i }))
      }
    }

    setAiState({
      isThinking: false,
      thinkingType: 'analyzing',
      progress: 0,
      currentTask: ''
    })
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "🎯 Parfait ! J'ai analysé votre demande et voici ce que je propose...",
      "✨ Excellente idée ! Laissez-moi créer quelque chose d'extraordinaire pour vous...",
      "🚀 Génial ! Je vais optimiser votre contenu pour qu'il soit encore plus engageant...",
      "💡 Inspiration détectée ! Voici une approche innovante pour votre projet...",
      "🎨 Créativité en action ! J'ai préparé quelque chose de spécial pour vous..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateSuggestions = (userMessage: string): string[] => {
    const suggestions = [
      "Ajouter des exemples pratiques",
      "Créer une version interactive",
      "Optimiser pour mobile",
      "Ajouter des animations",
      "Intégrer des quiz"
    ]
    return suggestions.slice(0, 3)
  }

  const generateActions = (userMessage: string) => {
    return [
      {
        id: 'save',
        label: 'Sauvegarder',
        icon: <BookmarkIcon className="w-4 h-4" />,
        action: () => handleSaveProject()
      },
      {
        id: 'share',
        label: 'Partager',
        icon: <ShareIcon className="w-4 h-4" />,
        action: () => handleShareProject()
      },
      {
        id: 'export',
        label: 'Exporter',
        icon: <CloudArrowUpIcon className="w-4 h-4" />,
        action: () => handleExportProject()
      }
    ]
  }

  const insertContent = (type: string) => {
    const contentMap: { [key: string]: string } = {
      text: "Insérer un bloc de texte enrichi",
      image: "Insérer une image avec IA",
      video: "Insérer une vidéo interactive",
      audio: "Insérer un fichier audio",
      chart: "Insérer un graphique dynamique"
    }
    setNewMessage(contentMap[type] || '')
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setSidebarTab('chat')
    const templateMessage = `Je veux créer un ${template.title.toLowerCase()}. ${template.description}`
    setNewMessage(templateMessage)
  }

  const handleAITool = (toolId: string) => {
    const toolMessages = {
      brain: "🧠 Activation du Brain Boost pour optimiser votre contenu...",
      cpu: "⚡ Analyse intelligente en cours...",
      bolt: "⚡ Génération rapide activée...",
      fire: "🔥 Inspiration créative en cours..."
    }
    
    const systemMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'system',
      content: toolMessages[toolId as keyof typeof toolMessages],
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, systemMessage])
  }

  const handleSaveProject = () => {
    // Simulate save
    console.log('Saving project...')
  }

  const handleShareProject = () => {
    // Simulate share
    console.log('Sharing project...')
  }

  const handleExportProject = () => {
    // Simulate export
    console.log('Exporting project...')
  }

  const handleRecordAudio = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording
      console.log('Recording started...')
    } else {
      // Stop recording
      console.log('Recording stopped...')
    }
  }

  const handleGenerateContent = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      const generatedMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'ai',
        content: "🎨 Contenu généré avec succès ! Voici votre création...",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, generatedMessage])
    }, 2000)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20 flex overflow-hidden">
      {/* Sidebar - Responsive */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed md:static z-40 h-full"
          >
            <StudioSidebar
              activeTab={sidebarTab}
              onTabChange={setSidebarTab}
              onConversationSelect={() => setSidebarTab('chat')}
              isCollapsed={isMobile && !sidebarOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Hamburger for mobile */}
      {isMobile && !sidebarOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-4 left-4 z-50 p-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </motion.button>
      )}

      {/* Main Content Area - Responsive */}
      <div className="flex-1 flex flex-col bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-0 border-l border-neutral-200/50 dark:border-neutral-700/50">
        {/* Header Chat - Responsive */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-3 md:p-4 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm min-h-[60px] flex-shrink-0"
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <motion.div 
              animate={{ rotate: aiState.isThinking ? 360 : 0 }}
              transition={{ duration: 2, repeat: aiState.isThinking ? Infinity : 0, ease: "linear" }}
              className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <SparklesIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </motion.div>
            <div className="min-w-0">
              <h2 className="font-bold text-neutral-900 dark:text-white text-sm md:text-lg truncate">
                Assistant IA Créatif
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs md:text-sm text-green-600 dark:text-green-400 font-medium truncate">
                  {aiState.isThinking ? aiState.currentTask : 'En ligne'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <MagnifyingGlassIcon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <ShareIcon className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 dark:text-neutral-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* AI Thinking Animation - Responsive */}
        <AnimatePresence>
          {aiState.isThinking && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 50, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-neutral-200/50 dark:border-neutral-700/50 flex-shrink-0"
            >
              <div className="flex items-center justify-center h-full px-3 md:px-4">
                <motion.div
                  style={{ scale: thinkingScale, opacity: thinkingOpacity }}
                  className="flex items-center space-x-2 md:space-x-3"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <CogIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
                      {aiState.currentTask}
                    </span>
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages - Responsive with proper height */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4 min-h-0">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Quick Actions - Responsive */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-2 md:px-4 py-1 md:py-2 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <span className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Actions rapides
            </span>
            <div className="flex items-center space-x-1 md:space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecordAudio}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
              >
                <MicrophoneIcon className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                <BoltIcon className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto pb-1">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all flex-shrink-0`}
              >
                {action.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Input Message - Responsive */}
        <div className="flex-shrink-0">
          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSendMessage}
            loading={aiState.isThinking}
          />
        </div>
      </div>

      {/* Panneau Aperçu Droite - Responsive */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex w-80 xl:w-96 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-l border-neutral-200/50 dark:border-neutral-700/50 flex-col"
          >
            {/* Header Aperçu - Responsive */}
            <div className="p-3 md:p-4 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm min-h-[60px] flex-shrink-0">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm md:text-lg">
                  Aperçu Live
                </h3>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <ArrowsPointingOutIcon className="w-3 h-3 md:w-4 md:h-4 text-neutral-600 dark:text-neutral-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <EyeIcon className="w-3 h-3 md:w-4 md:h-4 text-neutral-600 dark:text-neutral-300" />
                  </motion.button>
                </div>
              </div>
              
              {/* Device Preview Controls - Responsive */}
              <div className="flex items-center justify-center space-x-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
                {[
                  { id: 'desktop', icon: ComputerDesktopIcon },
                  { id: 'tablet', icon: DeviceTabletIcon },
                  { id: 'mobile', icon: DevicePhoneMobileIcon }
                ].map((device) => {
                  const IconComponent = device.icon
                  return (
                    <motion.button
                      key={device.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewMode(device.id as any)}
                      className={`p-1.5 md:p-2 rounded-md transition-all ${
                        previewMode === device.id
                          ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Zone Aperçu - Responsive */}
            <div className="flex-1 p-2 md:p-4 bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-900 dark:to-blue-900/20 min-h-0">
              <motion.div 
                layout
                className={`mx-auto bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg transition-all duration-300 h-full ${
                  previewMode === 'desktop' ? 'w-full' :
                  previewMode === 'tablet' ? 'w-64 h-80' :
                  'w-48 h-64'
                }`}
              >
                <div className="p-3 md:p-6 h-full flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
                    >
                      <RocketLaunchIcon className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    <h4 className="font-bold text-neutral-900 dark:text-white mb-1 md:mb-2 text-sm md:text-base">
                      Aperçu de votre création
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-3 md:mb-4">
                      Votre contenu apparaîtra ici en temps réel
                    </p>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span>Aperçu {previewMode}</span>
                      <span>•</span>
                      <span>Temps réel</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Controls Aperçu - Responsive */}
            <div className="p-3 md:p-4 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <span className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Contrôles
                </span>
                <div className="flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <PlayIcon className="w-3 h-3 md:w-4 md:h-4 text-neutral-600 dark:text-neutral-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <PauseIcon className="w-3 h-3 md:w-4 md:h-4 text-neutral-600 dark:text-neutral-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <StopIcon className="w-3 h-3 md:w-4 md:h-4 text-neutral-600 dark:text-neutral-300" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-1.5 md:py-2 px-3 md:px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg text-xs md:text-sm"
                >
                  Publier
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-1.5 md:py-2 px-3 md:px-4 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all text-xs md:text-sm"
                >
                  Sauvegarder
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Preview Button for Mobile/Tablet */}
      <AnimatePresence>
        {!showPreview && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPreview(true)}
            className="fixed bottom-4 right-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg border border-white/20 backdrop-blur-sm lg:hidden"
          >
            <EyeIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudioPage 