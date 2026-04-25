import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SMA Negeri 1 Purbalingga',
    template: '%s | SMA Negeri 1 Purbalingga',
  },
  description: 'Website resmi SMA Negeri 1 Purbalingga - Sekolah unggulan dengan prestasi akademik dan non-akademik terbaik di Purbalingga.',
  keywords: ['SMA Negeri 1 Purbalingga', 'SMAN 1 Purbalingga', 'sekolah', 'pendidikan', 'Purbalingga'],
  authors: [{ name: 'SMA Negeri 1 Purbalingga' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'SMA Negeri 1 Purbalingga',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
