import type { MetadataRoute } from 'next'
import { site } from '@/lib/site-data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#021d64',
    icons: [
      { src: '/brand/logo-mark.png', sizes: '328x228', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
