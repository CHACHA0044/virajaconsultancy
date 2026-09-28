import { FiArrowRight } from 'react-icons/fi'
import { BrandMark } from '@/components/ui/brand-mark'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { ButtonLink } from '@/components/ui/button'
import { site } from '@/lib/site-data'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <BrandArcs className="pointer-events-none absolute -right-32 -top-24 h-[22rem] w-[22rem] sm:-right-24 sm:-top-28 sm:h-[30rem] sm:w-[30rem]" />
      <div
        aria-hidden="true"
        className="wash-azure pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70"
      />

      <div className="shell relative pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy */}
          <div>
            <p className="rise delay-1 label-xs flex items-center gap-2.5 text-crimson-600">
              <span
                aria-hidden="true"
                className="brand-rule inline-block h-[2px] w-8 rounded-full"
              />
              {site.categoryLine}
            </p>

            <h1 className="rise delay-2 mt-5 text-[clamp(2.125rem,8.2vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-navy-900">
              <span className="block">VIRAJA</span>
              <span className="block">CONSULTANCY</span>
            </h1>

            <p className="rise delay-3 mt-6 max-w-[24ch] text-[clamp(1rem,2.4vw,1.25rem)] font-semibold leading-snug tracking-[-0.015em] text-navy-800">
              {site.brandStatement}
            </p>

            <p className="rise delay-4 mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              {site.pillars.join('  |  ')}
            </p>

            <div className="rise delay-5 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                Contact Us
                <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
              </ButtonLink>
              <ButtonLink
                href="/services"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Services
              </ButtonLink>
            </div>
          </div>

          {/* Emblem */}
          <div className="rise delay-4 flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-[19rem] items-center justify-center sm:max-w-[23rem] lg:max-w-none">
              <span
                aria-hidden="true"
                className="absolute inset-0 -m-6 rounded-[2rem] border border-line bg-white/70 shadow-card sm:-m-8"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-10 -bottom-5 h-16 rounded-full bg-navy-900/8 blur-2xl"
              />
              <BrandMark
                heightClass="h-[9.5rem] sm:h-[13rem] lg:h-[15.5rem]"
                priority
                sizes="(min-width: 1024px) 357px, (min-width: 640px) 299px, 219px"
                className="relative"
              />
            </div>
          </div>
        </div>

        {/* Thin brand band, echoing the curved card elements */}
        <div aria-hidden="true" className="mt-14 flex items-center gap-3 sm:mt-20">
          <span className="brand-rule h-px flex-1 opacity-70" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          </span>
          <span className="brand-rule h-px flex-1 opacity-70" />
        </div>
      </div>
    </section>
  )
}
