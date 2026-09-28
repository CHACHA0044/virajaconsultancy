import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { ServiceCard } from '@/components/ui/service-card'
import { StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import { ButtonLink } from '@/components/ui/button'
import { services, site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Service areas for Viraja Consultancy: legal, banking, finance, real estate, digital marketing, and advertising and promotion.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Service areas" title="SERVICES" lede={site.categoryLine} />

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <StaggerItem key={service.name} className="h-full">
                <ServiceCard service={service} index={index} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-col items-start gap-6 rounded-panel border border-line bg-surface p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[clamp(1.375rem,4vw,1.875rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
                Not sure where to start?
              </h2>
              <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                Call or WhatsApp us directly with your question.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                Contact us
              </ButtonLink>
              <ButtonLink href="/vision" size="lg" variant="secondary" className="w-full sm:w-auto">
                Our vision
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
