import React from 'react'
import { Metadata } from 'next'
import StudioSidebar from '@/components/studio/StudioSidebar'
import StudioToolbar from '@/components/studio/StudioToolbar'
import DropZoneEditor from '@/components/studio/DropZoneEditor'
import StudioPreview from '@/components/studio/StudioPreview'

export const metadata: Metadata = {
  title: 'Studio IA - Ayan Bridge V2',
  description: 'Créez vos contenus éducatifs avec notre studio intelligent',
}

export default function StudioPage() {
  return (
    <div className="h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Toolbar */}
      <StudioToolbar />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <StudioSidebar />
        
        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <DropZoneEditor />
        </div>
        
        {/* Preview Panel */}
        <StudioPreview />
      </div>
    </div>
  )
} 