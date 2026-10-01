import type { Metadata } from 'next'
import { FiArrowUpRight, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { PageHeader } from '@/components/ui/page-header'
import { PhoneButton } from '@/components/ui/phone-selection'
import { StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import type { SocialPlatform } from '@/lib/site-data'
import { contact, site, socialLinks, socialPlatforms } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Follow Us',
  description: `Official social profiles and contact options for ${site.name}. Facebook and Instagram links open in a new tab.`,
  alternates: { canonical: '/follow-us' },
}

const platformIcons: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

/** How a box behaves: an external profile, the phone picker, or not yet. */
type Kind = 'external' | 'phone' | 'soon'

type Option = {
  key: string
  label: string
  icon: IconType
  note: string
  kind: Kind
  /** Only external options are linked. */
  href?: string
  numeric?: boolean
}

/** One option list, so every box on the page is built the same way. */
const options: readonly Option[] = [
  ...socialPlatforms.map((item): Option => {
    const link = socialLinks.find((entry) => entry.platform === item.platform)
    return {
      key: item.platform,
      label: item.label,
      icon: platformIcons[item.platform],
      note: link ? 'Profile' : 'Soon',
      kind: link ? 'external' : 'soon',
      href: link?.href,
    }
  }),
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: FiMessageCircle,
    note: contact.whatsapp.display,
    kind: 'external',
    href: contact.whatsapp.href,
    numeric: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: FiPhone,
    // Both lines are one tap away, so the box never names one of them.
    note: `${contact.phones.length} numbers`,
    kind: 'phone',
  },
] as const

/**
 * One card definition for all six options. Because every box — linked, a phone
 * picker, or not — is built from these three strings and this one class list,
 * the size, radius, padding, icon and text alignment cannot drift apart between
 * options or between breakpoints.
 */
const CARD =
  'relative flex h-full min-h-[8.5rem] w-full flex-col items-center justify-center gap-2.5 rounded-card border border-line bg-white px-3 py-5 text-center'
const CARD_LINK = `${CARD} transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:border-azure-300 hover:shadow-card`
const CARD_PLAIN = `${CARD} cursor-default`

function OptionBody({ option }: { option: Option }) {
  const Icon = option.icon
  return (
    <>
      <span className="relative inline-flex">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
          <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
        </span>
        {/* Affordance only — absolutely placed, so it never changes the box size. */}
        {option.kind === 'external' ? (
          <FiArrowUpRight
            className="absolute -right-1 -top-1 h-3.5 w-3.5 text-azure-400"
            aria-hidden="true"
            focusable="false"
          />
        ) : null}
      </span>

      <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-navy-900">
        {option.label}
      </span>

      <span
        className={`min-h-[1rem] text-[0.6875rem] font-medium text-ink-muted${
          option.numeric ? ' tabular-nums' : ''
        }`}
      >
        {option.note}
      </span>
    </>
  )
}

export default function FollowUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stay connected"
        title="FOLLOW US"
        lede="Our confirmed profiles and the fastest ways to reach us. External links open in a new tab."
      />

      <section className="wash-azure border-y border-line py-14 sm:py-20">
        <div className="shell">
          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {options.map((option) => (
              <StaggerItem key={option.key} className="h-full">
                {option.kind === 'phone' ? (
                  <PhoneButton
                    icon={false}
                    chevron={false}
                    aria-label={`Phone — choose from ${contact.phones.length} numbers`}
                    className={CARD_LINK}
                  >
                    <OptionBody option={option} />
                  </PhoneButton>
                ) : option.kind === 'external' ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CARD_LINK}
                  >
                    <OptionBody option={option} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={CARD_PLAIN}>
                    <OptionBody option={option} />
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
