import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { address } from '@/lib/site-data'

/**
 * The only address preview on the home page. The full location experience and
 * the map live on /address.
 */
export function AddressPreview() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-white py-14 sm:py-18">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="max-w-[34rem]">
              <p className="label-xs text-crimson-600">Where to find us</p>

              <address
                className="mt-4 flex gap-3 text-[1.0625rem] font-semibold leading-relaxed tracking-[-0.015em] text-navy-900 not-italic sm:text-xl"
                aria-label={address.singleLine}
              >
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
            </div>

            <ButtonLink href="/address" size="lg" variant="secondary" className="shrink-0">
              View address
              <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
