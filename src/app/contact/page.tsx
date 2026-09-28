import type { Metadata } from 'next'
import { FiMessageCircle, FiPhone } from 'react-icons/fi'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { ContactCard } from '@/components/ui/contact-card'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { address, contact } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${contact.person} at ${contact.phone.display}. Call or WhatsApp ${contact.person}, ${address.city}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We are easy to reach"
        title="CONTACT US"
        lede="Call or WhatsApp directly — no forms, no waiting."
      />

      <section className="relative isolate overflow-hidden bg-white py-14 sm:py-20">
        <BrandArcs className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 opacity-60" />

        <div className="shell relative">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-8">
            {/* Primary actions */}
            <Reveal>
              <div className="rounded-panel border border-line bg-white p-6 shadow-card sm:p-8">
                <p className="label-xs text-crimson-600">Primary actions</p>
                <p className="mt-4 text-xl font-bold tracking-[-0.02em] text-navy-900 sm:text-2xl">
                  {contact.person}
                </p>
                <p className="label-xs mt-2 text-ink-muted">Call / WhatsApp</p>
                <a
                  href={`tel:${contact.phone.tel}`}
                  className="mt-2 inline-block text-[clamp(1.375rem,5vw,1.75rem)] font-bold tracking-[-0.03em] tabular-nums text-navy-900 transition-colors duration-200 hover:text-brand-blue"
                >
                  {contact.phone.display}
                </a>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`tel:${contact.phone.tel}`}
                    className="group/btn inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-navy-900 px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-navy-800"
                  >
                    <FiPhone className="h-4.5 w-4.5" aria-hidden="true" focusable="false" />
                    Call
                  </a>
                  <a
                    href={contact.phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-line-strong bg-white px-6 text-[0.9375rem] font-semibold text-navy-900 transition-colors duration-200 hover:border-azure-400 hover:bg-azure-50"
                  >
                    <FiMessageCircle className="h-4.5 w-4.5" aria-hidden="true" focusable="false" />
                    WhatsApp
                  </a>
                  <a
                    href="/address"
                    className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full px-6 text-[0.9375rem] font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
                  >
                    View address
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Address + full contact card */}
            <Reveal delay={0.08}>
              <ContactCard heading="Where to find us" />
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-6">
            <p className="text-[0.75rem] leading-relaxed text-ink-muted">
              This website is a front-end only project, so the buttons above connect you directly to
              the phone and WhatsApp. No information is collected or stored here.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
