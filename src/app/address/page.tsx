import type { Metadata } from 'next'
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { address, contact } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Our Address',
  description: `Address of ${contact.person} at ${address.singleLine}. Get directions on Google Maps.`,
  alternates: { canonical: '/address' },
}

export default function AddressPage() {
  return (
    <>
      <PageHeader eyebrow="Find us" title="OUR ADDRESS" />

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
            {/* Address details */}
            <Reveal className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-line bg-white p-6 shadow-card sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100">
                  <FiMapPin className="h-5 w-5" aria-hidden="true" focusable="false" />
                </span>

                <h2 className="mt-5 text-[1.125rem] font-bold tracking-[-0.02em] text-navy-900">
                  {contact.person}
                </h2>

                <address
                  className="mt-3 text-[1.0625rem] leading-relaxed text-ink not-italic sm:text-lg"
                  aria-label={address.singleLine}
                >
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <p className="mt-4 border-l-2 border-azure-200 pl-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Find us at Sultan Complex, behind Kaiserbagh Bus Stand, Lucknow, Uttar Pradesh.
                </p>

                <div className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
                  <ButtonLink href={address.directionsUrl} size="lg" external className="w-full">
                    Get directions
                    <FiArrowUpRight className="h-4 w-4" aria-hidden="true" focusable="false" />
                  </ButtonLink>
                  <ButtonLink
                    href={`tel:${contact.phone.tel}`}
                    size="lg"
                    variant="secondary"
                    className="w-full"
                  >
                    Call {contact.phone.display}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-panel border border-line bg-white p-2 shadow-card sm:p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[0.9rem] bg-surface-2 sm:aspect-[16/11]">
                  <iframe
                    src={address.mapsEmbedSrc}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={`Map showing ${address.singleLine}`}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
