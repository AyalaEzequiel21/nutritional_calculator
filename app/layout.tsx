import type { Metadata } from 'next'
import { DM_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import { HistoryProvider } from '@/context/history-context'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/layout/sidebar'
import { MobileHeader } from '@/components/layout/mobile-header'

const dmSans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora Nutricional',
  description: 'Herramientas de cálculo clínico para profesionales de la nutrición',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background">
        <HistoryProvider>
          <TooltipProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col min-w-0">
                <MobileHeader />
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </TooltipProvider>
        </HistoryProvider>
      </body>
    </html>
  )
}
