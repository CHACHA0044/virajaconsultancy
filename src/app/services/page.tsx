import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/button'
import { ContactActions } from '@/components/ui/contact-actions'
import { PageHeader } from '@/components/ui/page-header'
import { ServiceCard } from '@/components/ui/service-card'
import { StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import { contact, serviceAreaSentence, services, site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Services',
  description: `Service areas for ${site.name}: ${serviceAreaSentence}. Open any area to see what it covers.`,
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Service areas"
        title="SERVICES"
        lede={`Viraja Consultancy works across ${serviceAreaSentence}. Select any area to see what it covers and what to ask.`}
      />

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          <StaggerGroup className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} index={index} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 rounded-panel border border-line bg-surface p-6 sm:p-9 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[clamp(1.375rem,4vw,1.75rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
                Not sure where to start?
              </h2>
              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                Call or WhatsApp {contact.person} and describe your requirement.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <ContactActions size="lg" />
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                  Contact us
                </ButtonLink>
                <ButtonLink
                  href="/address"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  View address
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
