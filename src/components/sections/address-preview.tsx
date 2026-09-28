import { FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { address } from '@/lib/site-data'

export function AddressPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="shell">
        <div className="grid gap-10 rounded-panel border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading eyebrow="Where to find us" title="Our address" />
            <address className="mt-6 flex gap-3.5 text-[1.0625rem] leading-relaxed text-navy-900 not-italic sm:text-xl">
              <FiMapPin
                className="mt-1 h-5 w-5 shrink-0 text-brand-blue"
                aria-hidden="true"
                focusable="false"
              />
              <span>
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </Reveal>

          <Reveal delay={0.08} className="lg:justify-self-end">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/address" size="lg" className="w-full sm:w-auto lg:w-full">
                View location
                <FiArrowUpRight className="h-4 w-4" aria-hidden="true" focusable="false" />
              </ButtonLink>
              <ButtonLink
                href={address.directionsUrl}
                size="lg"
                variant="secondary"
                external
                className="w-full sm:w-auto lg:w-full"
              >
                Get directions
                <FiArrowUpRight className="h-4 w-4" aria-hidden="true" focusable="false" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
