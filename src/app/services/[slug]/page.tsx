import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/sections/service-detail'
import { getService, serviceAreaSentence, services, site } from '@/lib/site-data'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

/** Every service area is a real, statically rendered route. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    return { title: 'Service area not found' }
  }

  return {
    title: service.name,
    description: `${service.name} — ${service.summary} Service areas for ${site.name}: ${serviceAreaSentence}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
      images: [{ url: '/brand/logo-full.png', width: 448, height: 411, alt: site.name }],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  return <ServiceDetail service={service} />
}
