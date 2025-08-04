import { MetadataRoute } from 'next'
import { getSEOConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const seoConfig = getSEOConfig()
  const baseUrl = seoConfig.defaults.siteUrl || 'https://ai-code-template.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-demo', '/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin-demo', '/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin-demo', '/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin-demo', '/api/', '/_next/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
