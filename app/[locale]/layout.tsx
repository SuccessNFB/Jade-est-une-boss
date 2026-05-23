import type { Metadata }        from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages }            from 'next-intl/server'
import { hasLocale }              from 'next-intl'
import { Toaster }                from 'react-hot-toast'
import { notFound }               from 'next/navigation'
import { routing }                from '@/i18n/routing'
import { GoogleTag }              from '@/components/analytics/GoogleTag'

interface Props {
  children: React.ReactNode
  params:   Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isFr       = locale !== 'en'

  return {
    metadataBase: new URL('https://icekey.shop'),
    title: {
      default:  'ICEKEY – Cold is the new gold',
      template: '%s | ICEKEY',
    },
    description: isFr
      ? 'Bijoux moissanite VVS certifiés GRA — bagues, chaînes, pendentifs, bracelets. Éclat de diamant, prix honnête. Livraison offerte en France dès 100 €. Retour gratuit 30 jours.'
      : 'VVS moissanite jewelry — rings, chains, pendants, bracelets. GRA certified. Free shipping. 30-day returns. Diamond-grade brilliance at honest prices.',
    keywords: isFr
      ? [
          'moissanite', 'bijoux moissanite', 'bague moissanite', 'collier moissanite',
          'pendentif moissanite', 'bracelet moissanite', 'chaîne cubaine', 'VVS certifié',
          'certifié GRA', 'bijoux or', 'bijoux argent', 'bijoux hip hop', 'bijoux luxe france',
          'icekey', 'moissanite france',
        ]
      : [
          'moissanite jewelry', 'moissanite ring', 'moissanite necklace', 'VVS moissanite',
          'GRA certified', 'cuban chain', 'iced out jewelry', 'moissanite pendant',
          'lab diamond alternative', 'icekey',
        ],
    openGraph: {
      type:        'website',
      locale:      isFr ? 'fr_FR' : 'en_US',
      url:         'https://icekey.shop',
      siteName:    'ICEKEY',
      title:       'ICEKEY – Bijoux Moissanite VVS | Cold is the new gold',
      description: isFr
        ? 'Bijoux moissanite VVS certifiés GRA. Chaînes, bagues, pendentifs. Livraison offerte en France.'
        : 'VVS moissanite jewelry GRA certified. Chains, rings, pendants. Free shipping.',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ICEKEY — Bijoux Moissanite VVS' }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       'ICEKEY – Bijoux Moissanite VVS | Cold is the new gold',
      description: isFr
        ? 'Bijoux moissanite VVS certifiés GRA. Livraison offerte en France dès 100 €.'
        : 'VVS moissanite jewelry GRA certified. Free shipping.',
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical:  isFr ? 'https://icekey.shop' : 'https://icekey.shop/en',
      languages:  {
        'fr':    'https://icekey.shop',
        'en':    'https://icekey.shop/en',
        'x-default': 'https://icekey.shop',
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <GoogleTag />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background:   '#333',
                color:        '#fff',
                borderRadius: '12px',
                fontFamily:   'var(--font-syne)',
              },
              success: { iconTheme: { primary: '#D4AF37', secondary: '#fff' } },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
