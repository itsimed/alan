import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import i18n from '@/lib/i18n'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
})

export const metadata: Metadata = {
  title: 'Ayan Bridge V2 - Plateforme éducative et collaborative',
  description: 'Découvrez une nouvelle façon d\'apprendre, créer et investir avec Ayan Bridge V2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body className="font-sans antialiased">
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  )
} 