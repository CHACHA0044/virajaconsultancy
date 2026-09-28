'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiArrowUpRight, FiPhone, FiX } from 'react-icons/fi'
import { contact, navigation } from '@/lib/site-data'
import { backdropVariants, drawerVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

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
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  // Lock background scrolling and manage the keyboard while the sheet is open.
  useEffect(() => {
    if (!open) return

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return

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
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [open, onClose])

  const transition = reduce ? { duration: 0 } : undefined

  return (
    <AnimatePresence>
      {open ? (
        <div className="lg:hidden">
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-navy-900/45 backdrop-blur-[2px]"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className={cn(
              'fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col',
              'border-l border-line bg-white shadow-lift',
            )}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <p id={labelledBy} className="label-xs text-ink-muted">
                Menu
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors duration-200 hover:bg-navy-50"
              >
                <FiX className="h-5 w-5" aria-hidden="true" focusable="false" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
            >
              <ul className="flex flex-col gap-0.5">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-[0.9375rem] font-semibold',
                          'transition-colors duration-200',
                          active
                            ? 'bg-navy-900 text-white'
                            : 'text-navy-800 hover:bg-navy-50 hover:text-navy-900',
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-1.5 w-1.5 rounded-full transition-colors duration-200',
                            active ? 'bg-brand-red' : 'bg-transparent',
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="label-xs text-ink-muted">{contact.person}</p>
              <a
                href={`tel:${contact.phone.tel}`}
                onClick={onClose}
                className="mt-2.5 flex min-h-12 items-center justify-between gap-3 rounded-xl bg-azure-50 px-4 py-3 text-[0.9375rem] font-semibold tabular-nums text-navy-900 transition-colors duration-200 hover:bg-azure-100"
              >
                <span className="flex items-center gap-2.5">
                  <FiPhone className="h-4 w-4 text-navy-700" aria-hidden="true" focusable="false" />
                  {contact.phone.display}
                </span>
                <FiArrowUpRight
                  className="h-4 w-4 text-navy-500"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
