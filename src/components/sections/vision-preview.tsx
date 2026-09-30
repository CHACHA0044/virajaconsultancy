import { FiArrowRight } from 'react-icons/fi'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/lib/site-data'

/** The brand's stated direction, kept to a heading, the tagline and one line. */
export function VisionPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-14 sm:py-20">
      <BrandArcs className="pointer-events-none absolute -right-28 -top-24 h-64 w-64 opacity-70 sm:h-80 sm:w-80" />

      <div className="shell relative">
        <Reveal>
          <div className="max-w-[44rem]">
            <p className="label-xs text-crimson-600">Our vision</p>

            <h2 className="mt-4 text-[clamp(1.875rem,7.4vw,3.25rem)] font-bold uppercase leading-[1.03] tracking-[-0.035em] text-navy-900">
              {site.tagline}
            </h2>

            <span aria-hidden="true" className="brand-rule mt-7 block h-[3px] w-20 rounded-full" />

            <p className="mt-6 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              {site.visionLine}
            </p>

            <ButtonLink href="/vision" size="lg" variant="secondary" className="mt-7 w-full sm:w-auto">
              Read our vision
              <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
