import Script from 'next/script'

const GA4_ID   = process.env.NEXT_PUBLIC_GA4_ID
const GADS_ID  = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

/* Loaded once in the locale layout — enables gtag() globally */
export function GoogleTag() {
  const primaryId = GA4_ID ?? GADS_ID
  if (!primaryId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA4_ID  ? `gtag('config', '${GA4_ID}',  { send_page_view: true });` : ''}
          ${GADS_ID ? `gtag('config', '${GADS_ID}', { send_page_view: false });` : ''}
        `}
      </Script>
    </>
  )
}
