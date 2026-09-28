import { ContactCard } from '@/components/ui/contact-card'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export function ContactPreview() {
  return (
    <section className="wash-azure relative border-y border-line py-16 sm:py-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Get in touch"
              title="Speak to us directly"
              description="Call or WhatsApp the number below. The fastest way to reach Viraja Consultancy."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <ContactCard heading="Call or WhatsApp" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
