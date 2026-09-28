import type { Metadata } from 'next'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { FiArrowUpRight } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import type { SocialPlatform } from '@/lib/site-data'
import { contact, services, socialLinks, site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Follow Us',
  description: `Official social profiles for ${site.name}.`,
  alternates: { canonical: '/follow-us' },
}

const platformIcons: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
}

const platformStyles: Record<SocialPlatform, string> = {
  facebook: 'group-hover:bg-[#1877f2]',
  instagram: 'group-hover:bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_52%,#6228d7_100%)]',
}

export default function FollowUsPage() {
  const hasLinks = socialLinks.length > 0

  return (
    <>
      <PageHeader
        eyebrow="Stay connected"
        title="FOLLOW US"
        lede="Our official profiles. Every link below is maintained in one place and opens in a new tab."
      />

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          {hasLinks ? (
            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {socialLinks.map((link) => {
                const Icon = platformIcons[link.platform]
                return (
                  <StaggerItem key={link.platform} className="h-full">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="group flex h-full items-center gap-4 rounded-card border border-line bg-white p-5 transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift sm:p-6"
                    >
                      <span
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-300 ${platformStyles[link.platform]}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[1rem] font-bold tracking-[-0.015em] text-navy-900">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-muted">
                          {link.handle}
                        </span>
                      </span>

                      <FiArrowUpRight
                        className="h-4 w-4 shrink-0 text-navy-300 transition-colors duration-300 group-hover:text-navy-900"
                        aria-hidden="true"
                        focusable="false"
                      />

                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          ) : (
            <div className="rounded-panel border border-dashed border-line-strong bg-white p-8 text-center sm:p-12">
              <p className="text-[1.0625rem] font-bold tracking-[-0.02em] text-navy-900">
                Social links are not configured yet
              </p>
              <p className="mx-auto mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                Official social profiles for {site.name} have not been added to this website yet.
                Please check back soon, or reach us directly.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                  Contact us
                </ButtonLink>
              </div>
            </div>
          )}

          {hasLinks ? (
            <Reveal delay={0.12} className="mt-6">
              <p className="text-[0.75rem] leading-relaxed text-ink-muted">
                These are the only profiles published by {site.name}. Any other account claiming to
                represent us is not affiliated. For anything else, call or WhatsApp{' '}
                <a
                  href={`tel:${contact.phone.tel}`}
                  className="link-underline font-semibold tabular-nums text-navy-800"
                >
                  {contact.phone.display}
                </a>
                .
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="shell">
          <p className="label-xs text-crimson-600">Elsewhere</p>
          <h2 className="mt-4 text-[clamp(1.5rem,4.4vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
            Talk to us instead
          </h2>

          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {services.map((service) => (
              <li key={service.name}>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="h-auto min-h-12 w-full justify-start px-4 py-3 text-left text-[0.75rem] leading-tight sm:text-[0.8125rem]"
                >
                  {service.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
