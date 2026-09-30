import { FiArrowRight } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ServiceAreaList } from '@/components/ui/service-area-list'

/**
 * A concise introduction to the service areas, not a second copy of the
 * services directory: names only, each one a link, plus a single call to
 * action for anyone who wants the detail.
 */
export function ServicesPreview() {
  return (
    <section id="services" className="wash-azure relative border-y border-line py-14 sm:py-20">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="SERVICE AREAS"
              description="The areas Viraja Consultancy works across. Open the services page to see what each one covers."
            />
          </Reveal>

          <Reveal delay={0.06} className="sm:pb-1">
            <ButtonLink href="/services" size="lg" className="w-full sm:w-auto">
              View all services
              <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-9 sm:mt-10">
          <ServiceAreaList />
        </Reveal>
      </div>
    </section>
  )
}
