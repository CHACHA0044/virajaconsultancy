import type { MetadataRoute } from 'next'
import { getSiteUrl, navigation } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  return navigation.map((item) => ({
    url: `${base}${item.href === '/' ? '' : item.href}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: item.href === '/' ? 1 : 0.8,
  }))
}
