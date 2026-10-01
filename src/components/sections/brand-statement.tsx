import { BrandArcs } from '@/components/ui/brand-arcs'
import { Reveal } from '@/components/ui/reveal'
import { serviceAreaSentence, site } from '@/lib/site-data'

/**
 * The brand statement, written out as a section rather than a large decorative
 * logo block: it says what the consultancy covers. Every service area named
 * below is linked from the section that follows, so nothing is repeated here.
 */
export function BrandStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-14 sm:py-20">
      <BrandArcs className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 opacity-70 sm:h-80 sm:w-80" />

      <div className="shell relative">
        <Reveal>
          <div className="max-w-[42rem] border-l-2 border-crimson-600 pl-5 sm:pl-7">
            <p className="label-xs text-crimson-600">What Viraja covers</p>

            <h2 className="mt-4 text-[clamp(1.75rem,6.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy-900">
              {site.brandStatement}
            </h2>

            <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              Explore our service areas across {serviceAreaSentence}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
