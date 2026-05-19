import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://icekey.shop'),
  title: {
    default:  'ICEKEY – Cold is the new gold',
    template: '%s | ICEKEY',
  },
  description:
    'Bijoux en moissanite premium. Diamants de synthèse certifiés, montures or & argent. Livraison offerte en France.',
  keywords: ['moissanite', 'bijoux', 'bagues', 'colliers', 'pendentifs', 'or', 'argent', 'luxe', 'france'],
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    url:         'https://icekey.shop',
    siteName:    'ICEKEY',
    title:       'ICEKEY – Cold is the new gold',
    description: 'Bijoux en moissanite premium certifiés. Éclat maximal, prix honnête.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ICEKEY Jewelry' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'ICEKEY – Cold is the new gold',
    description: 'Bijoux en moissanite premium certifiés.',
  },
  robots: { index: true, follow: true },
  icons:  { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background:   '#333',
              color:        '#fff',
              borderRadius: '12px',
              fontFamily:   'var(--font-inter)',
            },
            success: { iconTheme: { primary: '#00D9FF', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
