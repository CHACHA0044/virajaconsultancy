'use client'

import { PhoneButton } from '@/components/ui/phone-selection'
import { WhatsAppLink } from '@/components/ui/whatsapp-link'
import { cn } from '@/lib/utils'

/**
 * The only place a Call button and a WhatsApp button sit side by side.
 *
 * Both controls are built from one list of measurements — same height, radius,
 * type size and icon — and share a two-column grid, so they stay on one row on
 * a phone, never drift apart, and stack only on widths too narrow to hold them.
 * The Call button opens the number picker; WhatsApp opens chat directly.
 */

type Tone = 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

/** Shared measurements. Both buttons take the same string, so they match. */
const CHROME =
  'inline-flex min-w-0 items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] ' +
  'transition-colors duration-200 ease-brand active:translate-y-px'

const SIZES: Record<Size, string> = {
  sm: 'min-h-[3.25rem] px-4 text-[0.9375rem]',
  md: 'min-h-12 px-3 text-[0.8125rem] sm:px-5 sm:text-[0.875rem]',
  lg: 'min-h-12 px-4 text-[0.875rem] sm:min-h-[3.25rem] sm:px-6 sm:text-[0.9375rem]',
}

export function ContactActions({
  tone = 'light',
  size = 'md',
  className,
  onSelectCall,
}: {
  /** `dark` for the navy panels, where the pair inverts. */
  tone?: Tone
  size?: Size
  className?: string
  /** Runs once a number is chosen — used to close the menu the row sits in. */
  onSelectCall?: () => void
}) {
  const dark = tone === 'dark'
  const chrome = cn(CHROME, SIZES[size])

  return (
    <div className={cn('grid grid-cols-2 gap-2.5 max-[20rem]:grid-cols-1', className)}>
      <PhoneButton
        onSelect={onSelectCall}
        className={cn(
          chrome,
          dark
            ? 'bg-white text-navy-900 hover:bg-azure-50'
            : 'bg-navy-900 text-white hover:bg-navy-800',
        )}
      />

      <WhatsAppLink
        srSuffix=""
        className={cn(
          chrome,
          dark
            ? 'border border-white/25 text-white hover:border-white/55 hover:bg-white/10'
            : 'border border-line-strong bg-white text-navy-900 hover:border-azure-400 hover:bg-azure-50',
        )}
      />
    </div>
  )
}
