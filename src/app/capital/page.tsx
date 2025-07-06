import React from 'react'
import { Metadata } from 'next'
import InvestProductCard from '@/components/capital/InvestProductCard'
import InvestTable from '@/components/capital/InvestTable'
import LivePitchVideo from '@/components/capital/LivePitchVideo'
import RevenueGraph from '@/components/capital/RevenueGraph'
import { investmentData } from '@/lib/data/investments'

export const metadata: Metadata = {
  title: 'Bridge Capital - Ayan Bridge V2',
  description: 'Investissez dans l\'avenir de l\'éducation',
}

export default function CapitalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Bridge Capital</h1>
          <p className="text-xl text-orange-100">
            Investissez dans les projets éducatifs de demain
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Revenue Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Aperçu des revenus</h2>
          <RevenueGraph />
        </div>

        {/* Live Pitches */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Pitches en direct</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {investmentData.livePitches.map((pitch, index) => (
              <LivePitchVideo key={index} {...pitch} />
            ))}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Opportunités d'investissement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentData.opportunities.map((opportunity, index) => (
              <InvestProductCard key={index} {...opportunity} />
            ))}
          </div>
        </div>

        {/* Investment Portfolio */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Mon portefeuille</h2>
          <InvestTable investments={investmentData.portfolio} />
        </div>
      </div>
    </div>
  )
} 