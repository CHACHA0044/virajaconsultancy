import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ServiceAreaList } from '@/components/ui/service-area-list'

/**
 * A concise introduction to the service areas, not a second copy of the
 * services directory: names only, each one a link. Every name here opens its
 * own page, so no separate "view all" button is needed.
 */
export function ServicesPreview() {
  return (
    <section id="services" className="wash-azure relative border-y border-line py-14 sm:py-20">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="SERVICE AREAS"
            description="The areas Viraja Consultancy works across. Open the services page to see what each one covers."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-9 sm:mt-10">
          <ServiceAreaList />
        </Reveal>
      </div>
    </section>
  )
}
