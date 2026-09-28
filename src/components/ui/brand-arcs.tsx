import { cn } from '@/lib/utils'

/**
 * Restrained decorative curves — a loose echo of the brand's curved
 * business-card elements. Purely decorative, never animated, always aria-hidden.
 */
export function BrandArcs({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none', className)}
    >
      <g strokeLinecap="round">
        <path
          d="M320 0A320 320 0 0 1 320 320"
          stroke="var(--color-brand-navy)"
          strokeOpacity="0.1"
          strokeWidth="1.25"
        />
        <path
          d="M320 40A280 280 0 0 1 320 320"
          stroke="var(--color-brand-blue)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path
          d="M320 78A242 242 0 0 1 320 320"
          stroke="var(--color-brand-green)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path
          d="M320 114A206 206 0 0 1 320 320"
          stroke="var(--color-brand-gold)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M320 150A170 170 0 0 1 320 320"
          stroke="var(--color-brand-navy)"
          strokeOpacity="0.14"
          strokeWidth="1.25"
        />
      </g>
      <circle cx="320" cy="42" r="4" fill="var(--color-brand-red)" />
    </svg>
  )
}

/** Matching set anchored to the opposite corner, for visual balance. */
export function BrandArcsMirror({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none', className)}
    >
      <g strokeLinecap="round">
        <path
          d="M0 0A320 320 0 0 0 0 320"
          stroke="var(--color-brand-navy)"
          strokeOpacity="0.1"
          strokeWidth="1.25"
        />
        <path
          d="M0 44A276 276 0 0 0 0 320"
          stroke="var(--color-brand-blue)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path
          d="M0 86A234 234 0 0 0 0 320"
          stroke="var(--color-brand-gold)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path
          d="M0 126A194 194 0 0 0 0 320"
          stroke="var(--color-brand-green)"
          strokeOpacity="0.38"
          strokeWidth="1.5"
        />
      </g>
      <circle cx="0" cy="46" r="3.5" fill="var(--color-brand-red)" />
    </svg>
  )
}
