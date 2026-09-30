import { FiArrowRight } from 'react-icons/fi'
import { BrandArcs, BrandArcsMirror } from '@/components/ui/brand-arcs'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site-data'

/**
 * Editorial hero. The wordmark carries the page, so the large standalone
 * emblem that used to sit below the copy has been removed — the fold now
 * goes straight from the headline to the service areas.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <BrandArcs className="pointer-events-none absolute -right-36 -top-28 h-[19rem] w-[19rem] opacity-90 sm:-right-28 sm:-top-32 sm:h-[30rem] sm:w-[30rem]" />
      <BrandArcsMirror className="pointer-events-none absolute -bottom-40 -left-32 h-[17rem] w-[17rem] opacity-60 sm:-left-28 sm:h-[26rem] sm:w-[26rem]" />
      <div
        aria-hidden="true"
        className="wash-azure pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-80"
      />

      <div className="shell relative pb-14 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="max-w-[46rem]">
          <p className="rise delay-1 label-xs flex items-center gap-2.5 text-crimson-600">
            <span
              aria-hidden="true"
              className="brand-rule inline-block h-[2px] w-8 shrink-0 rounded-full"
            />
            {site.categoryLine}
          </p>

          <h1 className="rise delay-2 mt-5 text-[clamp(2.25rem,9vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-navy-900">
            <span className="block">VIRAJA</span>
            <span className="block">CONSULTANCY</span>
          </h1>

          <p className="rise delay-3 mt-6 max-w-[26ch] text-[clamp(1.125rem,3.4vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-navy-800 sm:max-w-[30ch]">
            {site.heroLine}
          </p>

          <p className="rise delay-4 mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
            {site.heroSupport}
          </p>

          <div className="rise delay-5 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="/services" size="lg" className="w-full sm:w-auto">
              Explore services
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

        {/* Thin brand band, echoing the curved card elements. */}
        <div aria-hidden="true" className="mt-12 flex items-center gap-3 sm:mt-16">
          <span className="brand-rule h-px flex-1 opacity-70" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          </span>
          <span className="brand-rule h-px flex-1 opacity-70" />
        </div>

        <p className="mt-6 text-[0.6875rem] font-semibold tracking-[0.28em] text-ink-muted">
          {site.pillars.join('  |  ')}
        </p>
      </div>
    </section>
  )
}
