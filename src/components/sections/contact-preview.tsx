import { FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { contact } from '@/lib/site-data'

/**
 * One contact block for the whole site: the person, the single phone number
 * and the three ways to reach them.
 */
export function ContactPreview() {
  return (
    <section className="panel-navy relative isolate overflow-hidden py-14 text-white sm:py-20">
      <div className="shell relative">
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Get in touch"
              title="CALL OR WHATSAPP"
              description="One number, one person. Reach Viraja Consultancy directly and describe your requirement."
              tone="dark"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-panel border border-white/12 bg-white/[0.06] p-6 sm:p-7">
              <p className="text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                {contact.person}
              </p>

              <p className="label-xs mt-3 text-azure-300">Call / WhatsApp</p>

              <a
                href={`tel:${contact.phone.tel}`}
                className="mt-1.5 inline-flex items-center gap-2.5 text-[clamp(1.25rem,4.6vw,1.625rem)] font-bold tracking-[-0.02em] tabular-nums text-white transition-colors duration-200 ease-brand hover:text-azure-200"
              >
                <FiPhone
                  className="h-5 w-5 shrink-0 text-azure-300"
                  aria-hidden="true"
                  focusable="false"
                />
                {contact.phone.display}
              </a>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`tel:${contact.phone.tel}`}
                  className="group/btn inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 text-[0.875rem] font-semibold text-navy-900 transition-colors duration-200 ease-brand hover:bg-azure-50"
                >
                  <FiPhone className="h-4 w-4" aria-hidden="true" focusable="false" />
                  Call
                </a>
                <a
                  href={contact.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-[0.875rem] font-semibold text-white transition-colors duration-200 ease-brand hover:border-white/55 hover:bg-white/10"
                >
                  <FiMessageCircle className="h-4 w-4" aria-hidden="true" focusable="false" />
                  WhatsApp
                </a>
                <ButtonLink
                  href="/address"
                  variant="onDarkGhost"
                  className="min-h-12 flex-1 px-5 text-[0.875rem]"
                >
                  <FiMapPin className="h-4 w-4" aria-hidden="true" focusable="false" />
                  View address
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
