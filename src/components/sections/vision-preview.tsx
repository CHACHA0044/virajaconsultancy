import { FiArrowRight } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/lib/site-data'

export function VisionPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="shell">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="label-xs text-crimson-600">Our vision</p>

          <p className="mt-6 text-[clamp(1.75rem,7vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy-900">
            {site.tagline}
          </p>

          <span aria-hidden="true" className="brand-rule mt-8 h-[3px] w-24 rounded-full" />

          <ButtonLink href="/vision" variant="ghost" size="lg" className="mt-6">
            Our vision
            <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
