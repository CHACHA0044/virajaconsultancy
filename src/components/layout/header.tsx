'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiMenu, FiX } from 'react-icons/fi'
import { BrandLink } from '@/components/ui/brand-mark'
import { MobileNav } from '@/components/layout/mobile-nav'
import { navigation } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const menuLabelId = useId()
  const [condensed, setCondensed] = useState(false)

  /**
   * The sheet is open only for the exact route it was opened on, so a route
   * change closes it as a derived value — no effect, no extra render.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const open = openedOn === pathname

  const setOpen = useCallback((next: boolean) => setOpenedOn(next ? pathname : null), [pathname])
  const close = useCallback(() => setOpenedOn(null), [])

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  // Only show the header shadow once the visitor has actually scrolled.
  useEffect(() => {
    if (open) return
    const onScroll = () => setCondensed(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Send focus back to the trigger once the sheet has finished closing.
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      return
    }
    if (!wasOpen.current) return
    wasOpen.current = false
    const timer = window.setTimeout(
      // preventScroll matters: focusing the sticky header would otherwise
      // yank the page away from the position the scroll lock restored.
      () => toggleRef.current?.focus({ preventScroll: true }),
      reduce ? 0 : 220,
    )
    return () => window.clearTimeout(timer)
  }, [open, reduce])

  const iconTransition = reduce ? { duration: 0 } : { duration: 0.18 }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[border-color,box-shadow] duration-300 ease-brand',
        open
          ? 'z-[80] border-transparent bg-transparent shadow-none backdrop-blur-none'
          : cn(
              'border-transparent bg-white/92 backdrop-blur-md',
              condensed && 'border-line shadow-header',
            ),
      )}
    >
      {/* While the sheet is open the bar is only a positioning frame: the logo
          and desktop-only links step aside so the panel and backdrop are the
          only things visible, and taps fall through to the backdrop. */}
      <div
        className={cn(
          'shell flex h-[var(--vc-header-h)] items-center justify-between gap-3',
          open && 'pointer-events-none',
        )}
      >
        <BrandLink
          priority
          heightClass="h-8 lg:h-9"
          sizes="52px"
          className={cn('transition-opacity duration-200 ease-brand', open && 'opacity-0')}
        />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.875rem] font-medium',
                      'transition-colors duration-200',
                      active ? 'text-navy-900' : 'text-ink-soft hover:text-navy-900',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 -bottom-px h-[2px] origin-left transition-transform duration-300 ease-brand',
                        active ? 'brand-rule scale-x-100' : 'scale-x-0 bg-transparent',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              'hidden h-10 items-center rounded-full bg-navy-900 px-5 text-[0.8125rem] font-semibold text-white transition-[opacity,background-color] duration-200 ease-brand hover:bg-navy-800',
              'sm:inline-flex lg:hidden xl:inline-flex',
              open && 'opacity-0',
            )}
          >
            Contact
          </Link>

          {/*
            One button, two states. When the sheet opens it moves into the
            panel's close slot and swaps the hamburger for a cross, so the
            icon reads as a single control that has transformed.
          */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={cn(
              'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy-900 lg:hidden',
              'transition-colors duration-200 ease-brand',
              open
                ? 'pointer-events-auto fixed top-[var(--vc-sheet-close-top)] right-[var(--vc-sheet-close-right)] z-[90] hover:bg-navy-50'
                : 'border border-line hover:border-navy-300 hover:bg-navy-50',
            )}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={iconTransition}
                className="flex items-center justify-center"
                aria-hidden="true"
              >
                {open ? (
                  <FiX className="h-5 w-5" focusable="false" />
                ) : (
                  <FiMenu className="h-5 w-5" focusable="false" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileNav open={open} onClose={close} labelledBy={menuLabelId} />
    </header>
  )
}
