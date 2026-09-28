import type { Metadata } from 'next'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import { BrandArcs, BrandArcsMirror } from '@/components/ui/brand-arcs'
import { brandLockup } from '@/components/ui/brand-mark'
import { ButtonLink } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Our Vision',
  description: `Our vision — ${site.name}. ${site.tagline}.`,
  alternates: { canonical: '/vision' },
}

export default function VisionPage() {
  return (
    <>
      <PageHeader eyebrow={site.name} title="OUR VISION" />

      <section className="relative isolate overflow-hidden bg-white pb-16 pt-4 sm:pb-24 sm:pt-8">
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
                className="h-auto w-auto max-w-[15rem] select-none sm:max-w-[18rem]"
                sizes="(min-width: 640px) 288px, 240px"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="label-xs mt-10 text-crimson-600">Our vision</p>

              <p className="mt-6 text-[clamp(1.875rem,8vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-navy-900">
                {site.tagline}
              </p>
            </Reveal>

            {/* Restrained brand strokes: blue, red, green, gold. */}
            <Reveal delay={0.14} className="mt-10 w-full">
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
              <p className="mt-8 text-[0.6875rem] font-semibold tracking-[0.28em] text-ink-muted">
                {site.pillars.join('  ·  ')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wash-azure border-t border-line py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              {site.categoryLine}
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
