import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkGhost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-brand active:translate-y-px disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white shadow-[0_10px_24px_-14px_rgba(2,29,100,0.75)] hover:bg-navy-800 hover:shadow-[0_14px_30px_-14px_rgba(2,29,100,0.8)]',
  secondary:
    'border border-navy-200 bg-white text-navy-900 hover:border-azure-400 hover:bg-azure-50',
  ghost: 'text-navy-900 hover:bg-navy-50',
  onDark: 'bg-white text-navy-900 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] hover:bg-azure-50',
  onDarkGhost: 'border border-white/25 text-white hover:border-white/50 hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.875rem]',
  lg: 'h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7 sm:text-base',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />
}

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Set for links that open a new tab (adds target/rel/noopener). */
  external?: boolean
  'aria-label'?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className })
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}
