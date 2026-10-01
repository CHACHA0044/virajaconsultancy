import { ContactActions } from '@/components/ui/contact-actions'
import { address, contact } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/**
 * Contact block: the person, and the two ways to reach them. One Call button
 * opens the number picker; WhatsApp opens chat directly. Every detail comes
 * from the single source of truth.
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

      <ContactActions tone={variant} className="mt-6" />

      <dl className={cn('mt-6 border-t pt-5', dark ? 'border-white/12' : 'border-line')}>
        {contact.phones.map((phone) => (
          <div key={phone.id} className="flex items-baseline justify-between gap-4 py-1.5">
            <dt
              className={cn(
                'text-[0.8125rem] font-medium',
                dark ? 'text-azure-100/75' : 'text-ink-soft',
              )}
            >
              {phone.label}
            </dt>
            <dd
              className={cn(
                'text-[0.8125rem] font-semibold tabular-nums',
                dark ? 'text-white' : 'text-navy-900',
              )}
            >
              {phone.hours}
            </dd>
          </div>
        ))}
      </dl>

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
