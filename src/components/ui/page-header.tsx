import type { ReactNode } from 'react'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { cn } from '@/lib/utils'

/** Shared page hero for every inner route. Keeps vertical rhythm consistent. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string
  title: string
  lede?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        'relative isolate overflow-hidden bg-white pb-14 pt-10 sm:pb-20 sm:pt-16',
        className,
      )}
    >
      <BrandArcs className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 text-white sm:-right-20 sm:h-80 sm:w-80" />

      <div className="shell relative">
        <span className="label-xs flex items-center gap-2.5 text-crimson-600">
          <span aria-hidden="true" className="brand-rule inline-block h-[2px] w-8 rounded-full" />
          {eyebrow}
        </span>

        <h1 className="mt-5 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy-900">
          {title}
        </h1>

        {lede ? (
          <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
            {lede}
          </p>
        ) : null}

        {children}
      </div>
    </header>
  )
}
