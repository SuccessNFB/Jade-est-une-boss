import createMiddleware from 'next-intl/middleware'
import { routing }      from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - _next static/image files
     * - favicon, robots, sitemap, og-image
     */
    '/((?!api|_next|_vercel|favicon|robots|sitemap|og-image|apple-touch-icon|videos|images).*)',
  ],
}
