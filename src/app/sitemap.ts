import type { MetadataRoute } from 'next'
import { getSiteUrl, navigation, services } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = navigation.map((item) => ({
    url: `${base}${item.href === '/' ? '' : item.href}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: item.href === '/' ? 1 : 0.8,
  }))

  for (const service of services) {
    routes.push({
      url: `${base}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  return routes
}
