import type { Metadata, Viewport } from 'next'
import { Inter_Tight } from 'next/font/google'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getSiteUrl, site } from '@/lib/site-data'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const TITLE = 'VIRAJA CONSULTANCY | Legal, Banking, Finance, Real Estate & Digital Marketing'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: TITLE,
    template: '%s | VIRAJA CONSULTANCY',
  },
  description: site.description,
  applicationName: site.name,
  generator: 'Next.js',
  keywords: [
    'Viraja Consultancy',
    'Lucknow',
    'real estate',
    'digital marketing',
    'legal',
    'banking',
    'finance',
    'advertising',
  ],
  category: 'business',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: TITLE,
    description: site.description,
    url: '/',
    locale: 'en_IN',
    images: [{ url: '/brand/logo-full.png', width: 448, height: 411, alt: site.name }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: site.description,
    images: ['/brand/logo-full.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true },
}

export const viewport: Viewport = {
  themeColor: '#021d64',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={interTight.variable}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <div className="flex min-h-dvh flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
