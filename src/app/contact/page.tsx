import type { Metadata } from 'next'
import { FiMapPin } from 'react-icons/fi'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { ButtonLink } from '@/components/ui/button'
import { ContactCard } from '@/components/ui/contact-card'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { address, contact } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${contact.person}: call ${contact.phone.display} (${contact.phone.hours}) or WhatsApp ${contact.whatsapp.display} (${contact.whatsapp.hours}), ${address.city}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We are easy to reach"
        title="CONTACT US"
        lede={`One person, two numbers. Call or WhatsApp ${contact.person} during the hours shown and describe your requirement — there are no forms to fill in.`}
      />

      <section className="relative isolate overflow-hidden border-t border-line bg-white py-14 sm:py-20">
        <BrandArcs className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 opacity-60" />

        <div className="shell relative">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-6">
            <Reveal>
              <ContactCard heading="Call or WhatsApp" showAddress={false} />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-panel border border-line bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-4">
  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-navy-900 ring-1 ring-inset ring-line">
    <FiMapPin className="h-5 w-5" aria-hidden="true" focusable="false" />
  </span>

  <h2 className="text-[1.0625rem] font-bold tracking-[-0.02em] text-navy-900">
    Where to find us
  </h2>
</div>

                <address
                  className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft not-italic"
                  aria-label={address.singleLine}
                >
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <ButtonLink href="/address" size="md" variant="secondary" className="mt-6 w-full">
                  View address
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* <Reveal delay={0.12} className="mt-6">
            <p className="text-[0.75rem] leading-relaxed text-ink-muted">
              This website is a front-end only project, so the buttons above connect you directly to
              the phone and WhatsApp. No information is collected or stored here.
            </p>
          </Reveal> */}
        </div>
      </section>
    </>
  )
}
