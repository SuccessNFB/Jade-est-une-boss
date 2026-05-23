import type { Metadata } from 'next'
import { Inter, Playfair_Display, Barlow_Condensed, Space_Mono } from 'next/font/google'
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

const barlow = Barlow_Condensed({
  subsets:  ['latin'],
  weight:   ['400', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display:  'swap',
})

const spaceMono = Space_Mono({
  subsets:  ['latin'],
  weight:   ['400', '700'],
  variable: '--font-space-mono',
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
  robots: { index: true, follow: true },
  icons:  { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} ${barlow.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
