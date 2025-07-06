import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  PhotoIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'

const StudioPage: React.FC = () => {
  const { t } = useTranslation()
  const [selectedTool, setSelectedTool] = useState<string>('text')
  const [isGenerating, setIsGenerating] = useState(false)

  const tools = [
    {
      id: 'text',
      name: t('studio.tools.textGenerator'),
      description: t('studio.tools.textDescription'),
      icon: <DocumentTextIcon className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'image',
      name: t('studio.tools.imageGenerator'),
      description: t('studio.tools.imageDescription'),
      icon: <PhotoIcon className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'code',
      name: t('studio.tools.codeGenerator'),
      description: t('studio.tools.codeDescription'),
      icon: <CodeBracketIcon className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'design',
      name: t('studio.tools.designGenerator'),
      description: t('studio.tools.designDescription'),
      icon: <PaintBrushIcon className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simuler la génération
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <section className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {t('studio.title')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t('studio.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tools Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                  {t('studio.availableTools')}
                </h2>
                <div className="space-y-4">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        hover
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedTool === tool.id
                            ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : ''
                        }`}
                        onClick={() => handleToolSelect(tool.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center`}>
                            <div className={tool.color}>
                              {tool.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 dark:text-white">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      {t('studio.workspace.title')}
                    </h2>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<StopIcon className="w-4 h-4" />}
                        disabled={!isGenerating}
                      >
                        {t('studio.workspace.stop')}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={isGenerating ? undefined : <PlayIcon className="w-4 h-4" />}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        {isGenerating ? t('studio.workspace.generating') : t('studio.workspace.generate')}
                      </Button>
                    </div>
                  </div>

                  {/* Tool-specific interface */}
                  <div className="space-y-6">
                    {/* Input area */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        {t('studio.workspace.prompt')}
                      </label>
                      <textarea
                        className="w-full h-32 p-3 border border-neutral-300 rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-600 text-neutral-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={t('studio.workspace.promptPlaceholder')}
                      />
                    </div>

                    {/* Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          {t('studio.workspace.style')}
                        </label>
                        <select className="w-full p-2 border border-neutral-300 rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-600 text-neutral-900 dark:text-white">
                          <option>{t('studio.styles.creative')}</option>
                          <option>{t('studio.styles.professional')}</option>
                          <option>{t('studio.styles.casual')}</option>
                          <option>{t('studio.styles.technical')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          {t('studio.workspace.quality')}
                        </label>
                        <select className="w-full p-2 border border-neutral-300 rounded-lg bg-white dark:bg-neutral-800 dark:border-neutral-600 text-neutral-900 dark:text-white">
                          <option>{t('studio.quality.standard')}</option>
                          <option>{t('studio.quality.high')}</option>
                          <option>{t('studio.quality.premium')}</option>
                        </select>
                      </div>
                    </div>

                    {/* Output area */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        {t('studio.workspace.result')}
                      </label>
                      <div className="w-full h-64 p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
                        {isGenerating ? (
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                            <p className="text-neutral-600 dark:text-neutral-400">{t('studio.workspace.generating')}</p>
                          </div>
                        ) : (
                          <p className="text-neutral-500 dark:text-neutral-400">{t('studio.workspace.noResult')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudioPage 