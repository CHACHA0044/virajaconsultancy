import { FiArrowRight } from 'react-icons/fi'
import { SectionHeading } from '@/components/ui/section-heading'
import { ServiceCard } from '@/components/ui/service-card'
import { StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import { ButtonLink } from '@/components/ui/button'
import { services } from '@/lib/site-data'

export function ServicesPreview() {
  return (
    <section id="services" className="wash-azure relative border-y border-line py-16 sm:py-24">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Service areas"
            description="A single consultancy across property, finance, legal and marketing."
          />
          <ButtonLink
            href="/services"
            variant="secondary"
            className="shrink-0 self-start sm:self-auto"
          >
            View all services
            <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
          </ButtonLink>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.name} className="h-full">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
