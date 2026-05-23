import type { Metadata } from 'next'
import { Syne, Playfair_Display, Space_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display:  'swap',
})

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
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
    <html className={`${syne.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
