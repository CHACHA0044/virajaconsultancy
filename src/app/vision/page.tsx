import type { Metadata } from 'next'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import { BrandArcs, BrandArcsMirror } from '@/components/ui/brand-arcs'
import { brandLockup } from '@/components/ui/brand-mark'
import { ButtonLink } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ServiceAreaList } from '@/components/ui/service-area-list'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Our Vision',
  description: `Our vision — ${site.name}. ${site.tagline}. ${site.categoryLine}.`,
  alternates: { canonical: '/vision' },
}

export default function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow={site.name}
        title="OUR VISION"
        lede={site.visionLine}
      />

      <section className="relative isolate overflow-hidden bg-white pb-14 pt-2 sm:pb-20 sm:pt-6">
        <BrandArcs className="pointer-events-none absolute -left-28 top-10 h-72 w-72 opacity-70" />
        <BrandArcsMirror className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 opacity-70" />

        <div className="shell relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal>
              <Image
                src={brandLockup.src}
                alt={`${site.name} logo`}
                width={brandLockup.width}
                height={brandLockup.height}
                priority
                className="h-auto w-auto max-w-[11rem] select-none sm:max-w-[13rem]"
                sizes="(min-width: 640px) 208px, 176px"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="label-xs mt-9 text-crimson-600">Our vision</p>

              <p className="mt-5 text-[clamp(1.75rem,7.4vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.04em] text-navy-900">
                {site.tagline}
              </p>
            </Reveal>

            {/* Restrained brand strokes: blue, red, green, gold. */}
            <Reveal delay={0.14} className="mt-9 w-full">
              <div className="mx-auto flex max-w-md items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-brand-blue/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                <span className="h-px flex-1 bg-brand-navy/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="h-px flex-1 bg-brand-navy/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                <span className="h-px flex-1 bg-brand-blue/35" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-7 text-[0.6875rem] font-semibold tracking-[0.28em] text-ink-muted">
                {site.pillars.join('  ·  ')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="In practice"
              title="WHERE THIS SHOWS UP"
              description="The vision is kept practical by working across a defined set of service areas."
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-9 sm:mt-10">
            <ServiceAreaList />
          </Reveal>

          <Reveal delay={0.12} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" size="lg" className="w-full sm:w-auto">
              View services
              <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </ButtonLink>
            <ButtonLink
              href="/contact"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Contact us
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
