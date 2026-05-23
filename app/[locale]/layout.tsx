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
      ? 'Bijoux en moissanite premium. Diamants de synthèse certifiés, montures or & argent. Livraison offerte en France.'
      : 'Premium moissanite jewelry. VVS certified lab-created diamonds. Free shipping. GRA certified.',
    keywords: isFr
      ? ['moissanite', 'bijoux', 'bagues', 'colliers', 'pendentifs', 'or', 'argent', 'luxe', 'france']
      : ['moissanite', 'jewelry', 'rings', 'necklaces', 'pendants', 'gold', 'silver', 'luxury', 'vvs'],
    openGraph: {
      type:        'website',
      locale:      isFr ? 'fr_FR' : 'en_US',
      url:         'https://icekey.shop',
      siteName:    'ICEKEY',
      title:       'ICEKEY – Cold is the new gold',
      description: isFr
        ? 'Bijoux en moissanite premium certifiés. Éclat maximal, prix honnête.'
        : 'Premium VVS moissanite jewelry. Maximum brilliance, honest price.',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ICEKEY Jewelry' }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       'ICEKEY – Cold is the new gold',
      description: isFr
        ? 'Bijoux en moissanite premium certifiés.'
        : 'Premium VVS moissanite jewelry.',
    },
    alternates: {
      canonical:  'https://icekey.shop',
      languages:  {
        'fr': 'https://icekey.shop',
        'en': 'https://icekey.shop/en',
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
                fontFamily:   'var(--font-inter)',
              },
              success: { iconTheme: { primary: '#D4AF37', secondary: '#fff' } },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
