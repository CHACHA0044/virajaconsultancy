import { FiMapPin } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { ContactActions } from '@/components/ui/contact-actions'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { contact } from '@/lib/site-data'

/**
 * One contact block for the whole site: the person, and the two ways to reach
 * them. The Call button opens the number picker rather than a single number.
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
              description="One person, two numbers. Reach Viraja Consultancy directly and describe your requirement."
              tone="dark"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-panel border border-white/12 bg-white/[0.06] p-6 sm:p-7">
              <p className="text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                {contact.person}
              </p>

              <p className="label-xs mt-3 text-azure-300">Availability</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-azure-100/85">
                The office line is answered {contact.phone.hours}. WhatsApp is answered{' '}
                {contact.whatsapp.hours}. Tap call to choose a number.
              </p>

              <ContactActions tone="dark" size="lg" className="mt-7" />

              <ButtonLink
                href="/address"
                variant="onDarkGhost"
                size="lg"
                className="mt-2.5 w-full text-[0.9375rem]"
              >
                <FiMapPin className="h-4 w-4" aria-hidden="true" focusable="false" />
                View address
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
