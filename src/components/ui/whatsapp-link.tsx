import type { ReactNode } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { contact } from '@/lib/site-data'

/**
 * WhatsApp is never part of the number picker. This link goes straight to
 * chat, always on the mobile number, so the two contact paths stay separate.
 *
 * It carries no client code: used from a server component it stays a plain
 * anchor, and where it sits beside a `PhoneButton` it simply becomes part of
 * that button's client bundle.
 */
export function WhatsAppLink({
  className,
  children,
  icon = true,
  srSuffix = ' (opens WhatsApp in a new tab)',
}: {
  /** Anchor chrome, supplied by the caller so it fits its own surface. */
  className?: string
  /** Custom contents. Omit for the standard icon + "WhatsApp". */
  children?: ReactNode
  /** Render the WhatsApp glyph. */
  icon?: boolean
  /** Visually hidden note about the new tab. Pass an empty string to omit it. */
  srSuffix?: string
}) {
  return (
    <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className={className}>
      {icon ? (
        <FiMessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" />
      ) : null}
      {children ?? <span className="min-w-0 truncate">WhatsApp</span>}
      {srSuffix ? <span className="sr-only">{srSuffix}</span> : null}
    </a>
  )
}
