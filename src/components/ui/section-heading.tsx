import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Consistent section heading: small brand label, controlled display size,
 * optional supporting line. Used on every page for a uniform rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  tone = 'light',
  className,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  tone?: 'light' | 'dark'
  className?: string
  children?: ReactNode
}) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'label-xs flex items-center gap-2.5',
            tone === 'dark' ? 'text-azure-300' : 'text-crimson-600',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'brand-rule inline-block h-[2px] w-8 rounded-full',
              centered && 'order-none',
            )}
          />
          {eyebrow}
        </span>
      ) : null}

      <Tag
        className={cn(
          'mt-4 text-[clamp(1.75rem,5.2vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em]',
          tone === 'dark' ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={cn(
            'mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed sm:text-base',
            centered && 'mx-auto',
            tone === 'dark' ? 'text-azure-100/80' : 'text-ink-soft',
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  )
}
