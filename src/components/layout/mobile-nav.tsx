'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiArrowUpRight, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { contact, navigation, site } from '@/lib/site-data'
import {
  DURATION,
  EASE,
  backdropVariants,
  drawerGroupVariants,
  drawerItemVariants,
  drawerVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** No subscription needed: this only reports whether we are on the client. */
const subscribeToNothing = () => () => {}
const isClient = () => true
const isServer = () => false

/**
 * Locks page scrolling while the sheet is open, including on iOS where
 * `overflow: hidden` alone does not stop the page moving under the overlay.
 * The scroll offset is restored exactly on close.
 */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const { body } = document
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
      window.scrollTo(0, scrollY)
    }
  }, [active])
}

export function MobileNav({
  open,
  onClose,
  labelledBy,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
}) {
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // The overlay is portalled to <body> so the header's `backdrop-filter` can
  // never become the containing block for these fixed elements.
  const mounted = useSyncExternalStore(subscribeToNothing, isClient, isServer)

  useScrollLock(open)

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  // Move focus into the sheet on open, and keep Tab inside it while it is open.
  useEffect(() => {
    if (!open) return

    const focusTimer = window.setTimeout(
      () => panelRef.current?.focus({ preventScroll: true }),
      90,
    )

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return

      // Focus starts on the panel itself, so send it into the list first.
      if (document.activeElement === panel) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  // The sheet is a small-screen control: if the viewport grows past the
  // desktop breakpoint, close it so nothing stays locked behind it.
  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeIfWide = () => {
      if (desktop.matches || window.innerWidth >= 1024) onClose()
    }
    desktop.addEventListener('change', closeIfWide)
    window.addEventListener('resize', closeIfWide)
    closeIfWide()
    return () => {
      desktop.removeEventListener('change', closeIfWide)
      window.removeEventListener('resize', closeIfWide)
    }
  }, [open, onClose])

  if (!mounted) return null

  // Reduced motion collapses every duration and removes the stagger entirely.
  const transition = reduce ? { duration: 0 } : { duration: DURATION.fast, ease: EASE }
  const staggerVariants = reduce
    ? drawerGroupVariants(0)
    : drawerGroupVariants(0.04, 0.05)

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="lg:hidden">
          {/*
            Full-viewport backdrop, anchored to the top of the window and
            rendered above the page. The blur and the dim both live here, so
            nothing underneath stays legible or distracting.
          */}
          <motion.div
            key="mobile-nav-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="fixed inset-0 z-[60] bg-navy-900/60 backdrop-blur-[6px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="mobile-nav-panel"
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className={cn(
              'fixed inset-y-0 right-0 z-[70] flex w-[min(21rem,85vw)] flex-col focus:outline-none',
              'border-l border-line bg-white shadow-lift',
            )}
          >
            {/* Top of the panel: wordmark, hairline, and room for the header's close control. */}
            <div className="flex h-[var(--vc-header-h)] shrink-0 items-center border-b border-line py-2 pl-5 pr-16">
              <p id={labelledBy} className="min-w-0">
                <span className="block truncate text-[0.875rem] font-bold tracking-[-0.02em] text-navy-900">
                  {site.name}
                </span>
                <span className="mt-1 block truncate text-[0.5625rem] font-semibold tracking-[0.18em] text-crimson-600">
                  {site.tagline}
                </span>
              </p>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-2"
            >
              <motion.ul
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <motion.li key={item.href} variants={drawerItemVariants} transition={transition}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group/nav relative flex min-h-14 items-center justify-between gap-3 border-b border-line py-3',
                          'text-[1.0625rem] font-semibold uppercase tracking-[0.02em] transition-colors duration-200 ease-brand',
                          active ? 'text-navy-900' : 'text-ink-soft hover:text-navy-900',
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200',
                              active
                                ? 'bg-crimson-600'
                                : 'bg-line-strong group-hover/nav:bg-azure-400',
                            )}
                          />
                          <span className="truncate">{item.label}</span>
                        </span>

                        <FiArrowUpRight
                          aria-hidden="true"
                          focusable="false"
                          className={cn(
                            'h-4 w-4 shrink-0 transition-[opacity,transform] duration-200 ease-brand',
                            active
                              ? 'text-crimson-600'
                              : '-translate-x-1 text-navy-300 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 group-focus-visible/nav:translate-x-0 group-focus-visible/nav:opacity-100',
                          )}
                        />
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            {/* Primary action, always the easiest thing to reach. */}
            <div className="shrink-0 border-t border-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <motion.div
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="label-xs text-ink-muted">Call / WhatsApp</p>

                <div className="mt-3 flex flex-col gap-2.5">
                  <a
                    href={contact.phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="group/call flex min-h-[3.25rem] items-center justify-between gap-3 rounded-full bg-navy-900 px-5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 ease-brand hover:bg-navy-800"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <FiMessageCircle
                        className="h-4 w-4 shrink-0 text-azure-200"
                        aria-hidden="true"
                        focusable="false"
                      />
                      <span className="truncate">WhatsApp</span>
                    </span>
                    <FiArrowUpRight
                      className="h-4 w-4 shrink-0 text-azure-200 transition-transform duration-200 ease-brand group-hover/call:translate-x-0.5"
                      aria-hidden="true"
                      focusable="false"
                    />
                  </a>

                  <a
                    href={`tel:${contact.phone.tel}`}
                    onClick={onClose}
                    className="group/call flex min-h-[3.25rem] items-center justify-between gap-3 rounded-full border border-line-strong bg-white px-5 text-[0.9375rem] font-semibold tabular-nums text-navy-900 transition-colors duration-200 ease-brand hover:border-azure-400 hover:bg-azure-50"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <FiPhone
                        className="h-4 w-4 shrink-0 text-navy-700"
                        aria-hidden="true"
                        focusable="false"
                      />
                      <span className="truncate">{contact.person}</span>
                    </span>
                    <span className="shrink-0 text-[0.8125rem] text-ink-muted transition-colors duration-200 group-hover/call:text-navy-700">
                      {contact.phone.display}
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
