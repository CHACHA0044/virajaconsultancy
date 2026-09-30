import type { Metadata } from 'next'
import { FiMessageCircle, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import type { SocialPlatform } from '@/lib/site-data'
import { contact, site, socialLinks, socialPlatforms } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Follow Us',
  description: `Official social profiles for ${site.name}. No profiles have been published yet.`,
  alternates: { canonical: '/follow-us' },
}

const platformIcons: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

export default function FollowUsPage() {
  const hasLinks = socialLinks.length > 0

  return (
    <>
      <PageHeader
        eyebrow="Stay connected"
        title="FOLLOW US"
        lede={
          hasLinks
            ? 'Our official profiles. Every link below opens in a new tab.'
            : 'This page is where our official profiles will appear. We have not published any yet, so there is nothing to link to — only confirmed accounts are ever listed here.'
        }
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
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
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

                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          ) : (
            <Reveal>
              <div className="rounded-panel border border-line bg-white p-6 shadow-card sm:p-9">
                <p className="label-xs text-crimson-600">Not configured yet</p>

                <h2 className="mt-4 text-[clamp(1.375rem,4.4vw,1.875rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
                  No official social profiles have been added
                </h2>

                <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  We would rather leave this space empty than publish an account we have not
                  verified. When an official profile is confirmed it will be added here, and the
                  link below is the fastest way to reach us in the meantime.
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {socialPlatforms.map((item) => {
                    const Icon = platformIcons[item.platform]
                    return (
                      <li
                        key={item.platform}
                        className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-muted"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
                        {item.label}
                        <span className="font-medium normal-case tracking-normal text-ink-muted/80">
                          soon
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={contact.phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-navy-900 px-5 text-[0.875rem] font-semibold text-white transition-colors duration-200 ease-brand hover:bg-navy-800"
                  >
                    <FiMessageCircle className="h-4 w-4" aria-hidden="true" focusable="false" />
                    WhatsApp {contact.person}
                  </a>
                  <a
                    href={`tel:${contact.phone.tel}`}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-5 text-[0.875rem] font-semibold tabular-nums text-navy-900 transition-colors duration-200 ease-brand hover:border-azure-400 hover:bg-azure-50"
                  >
                    <FiPhone className="h-4 w-4" aria-hidden="true" focusable="false" />
                    {contact.phone.display}
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
