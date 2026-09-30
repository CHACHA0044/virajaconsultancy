import type { ReactNode } from 'react'
import { FiArrowUpRight, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { address, contact } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Action = {
  key: string
  label: string
  href: string
  icon: typeof FiPhone
  external?: boolean
  /** Filled treatment for the primary action. */
  primary?: boolean
}

/** The three always-available contact actions, in a stable order. */
export const contactActions: readonly Action[] = [
  {
    key: 'call',
    label: 'Call',
    href: `tel:${contact.phone.tel}`,
    icon: FiPhone,
    primary: true,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: contact.phone.whatsapp,
    icon: FiMessageCircle,
    external: true,
  },
  // {
  //   key: 'address',
  //   label: 'View address',
  //   href: '/address',
  //   icon: FiMapPin,
  // },
] as const

/**
 * Contact block: the person, the single phone number, and the three actions.
 * All contact details come from the single source of truth.
 */
export function ContactCard({
  className,
  variant = 'light',
  heading = 'Call or WhatsApp',
  showAddress = true,
  headingId,
}: {
  className?: string
  variant?: 'light' | 'dark'
  heading?: string
  showAddress?: boolean
  headingId?: string
}) {
  const dark = variant === 'dark'

  return (
    <div
      className={cn(
        'h-full rounded-panel border p-6 sm:p-7',
        dark ? 'border-white/12 bg-white/[0.06]' : 'border-line bg-white shadow-card',
        className,
      )}
    >
      <p id={headingId} className={cn('label-xs', dark ? 'text-azure-300' : 'text-crimson-600')}>
        {heading}
      </p>

      <p
        className={cn(
          'mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl',
          dark ? 'text-white' : 'text-navy-900',
        )}
      >
        {contact.person}
      </p>

      <a
        href={`tel:${contact.phone.tel}`}
        className={cn(
          'mt-2 inline-flex items-center gap-2 font-semibold tracking-[0.01em] tabular-nums transition-colors duration-200',
          dark ? 'text-azure-200 hover:text-white' : 'text-navy-700 hover:text-brand-blue',
        )}
      >
        <span className="sr-only">Call or WhatsApp </span>
        {contact.phone.display}
      </a>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        {contactActions.map((action) => (
          <ContactActionButton key={action.key} action={action} dark={dark} />
        ))}
      </div>

      {showAddress ? (
        <div className={cn('mt-7 border-t pt-6', dark ? 'border-white/12' : 'border-line')}>
          <p className={cn('label-xs', dark ? 'text-azure-300' : 'text-ink-muted')}>Address</p>
          <address
            className={cn(
              'mt-2.5 text-[0.9375rem] leading-relaxed not-italic',
              dark ? 'text-azure-100/85' : 'text-ink-soft',
            )}
          >
            {address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      ) : null}
    </div>
  )
}

function ContactActionButton({ action, dark }: { action: Action; dark: boolean }) {
  const Icon = action.icon
  const classes = cn(
    'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold',
    'transition-colors duration-200 sm:flex-none',
    action.primary
      ? dark
        ? 'bg-white text-navy-900 hover:bg-azure-50'
        : 'bg-navy-900 text-white hover:bg-navy-800'
      : dark
        ? 'border border-white/25 text-white hover:border-white/55 hover:bg-white/10'
        : 'border border-line-strong bg-white text-navy-900 hover:border-azure-400 hover:bg-azure-50',
  )

  const content: ReactNode = (
    <>
      <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
      {action.label}
    </>
  )

  if (action.href.startsWith('/')) {
    return (
      <a href={action.href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <a
      href={action.href}
      className={classes}
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
      {action.external ? (
        <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" focusable="false" />
      ) : null}
    </a>
  )
}
