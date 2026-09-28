import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/**
 * The official emblem, taken from the supplied logo artwork.
 * `logo-mark.png` is the shield-and-monogram portion of the original `logo.png`,
 * cropped and given a transparent background. The source file is untouched.
 */
export const brandMark = {
  src: '/brand/logo-mark.png',
  width: 328,
  height: 228,
} as const

/** The full vertical lockup: emblem + "VIRAJA" + "CONSULTANCY". */
export const brandLockup = {
  src: '/brand/logo-full.png',
  width: 448,
  height: 411,
} as const

type BrandMarkProps = {
  /**
   * Tailwind height classes for the rendered emblem. Height is set rather than
   * width so the true aspect ratio (328:228) is always preserved.
   */
  heightClass?: string
  priority?: boolean
  className?: string
  /** Overrides the empty alt for meaningful, standalone uses. */
  alt?: string
  /**
   * The rendered width, so the browser can pick a right-sized candidate instead
   * of the largest one. Defaults to a small header-sized emblem.
   */
  sizes?: string
}

/** Emblem only, sized by height so the artwork is never distorted. */
export function BrandMark({
  heightClass = 'h-9',
  priority = false,
  className,
  alt = '',
  sizes = '52px',
}: BrandMarkProps) {
  return (
    <Image
      src={brandMark.src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={brandMark.width}
      height={brandMark.height}
      priority={priority}
      sizes={sizes}
      className={cn('w-auto max-w-full select-none', heightClass, className)}
    />
  )
}

/** Header / footer lockup: emblem plus the business name set in the brand type. */
export function BrandLockupText({
  heightClass = 'h-8',
  priority = false,
  className,
  onDark = false,
  sizes = '46px',
}: BrandMarkProps & { onDark?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <BrandMark heightClass={heightClass} priority={priority} sizes={sizes} />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            'text-[0.95rem] font-bold tracking-[-0.02em]',
            onDark ? 'text-white' : 'text-navy-900',
          )}
        >
          {site.shortName}
        </span>
        <span
          className={cn(
            'mt-[3px] text-[0.5625rem] font-medium tracking-[0.19em]',
            onDark ? 'text-azure-200/85' : 'text-ink-muted',
          )}
        >
          CONSULTANCY
        </span>
      </span>
    </span>
  )
}

type BrandLinkProps = BrandMarkProps & {
  onDark?: boolean
  label?: string
}

/** The header wordmark as a single accessible link back to the home page. */
export function BrandLink({
  heightClass = 'h-8 lg:h-9',
  priority = false,
  className,
  onDark = false,
  label = `${site.name} — home`,
  sizes = '52px',
}: BrandLinkProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center rounded-lg transition-opacity duration-200 hover:opacity-85',
        className,
      )}
    >
      <BrandLockupText
        heightClass={heightClass}
        priority={priority}
        onDark={onDark}
        sizes={sizes}
      />
    </Link>
  )
}
