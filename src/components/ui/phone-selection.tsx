'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useSyncExternalStore } from 'react'
import type { ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiChevronDown, FiChevronRight, FiClock, FiPhone, FiX } from 'react-icons/fi'
import { contact } from '@/lib/site-data'
import {
  DURATION,
  EASE,
  backdropVariants,
  pickerPopoverAboveVariants,
  pickerPopoverVariants,
  pickerSheetVariants,
} from '@/lib/motion'
import { useScrollLock } from '@/lib/use-scroll-lock'
import { cn } from '@/lib/utils'

/**
 * The one call action used across the site.
 *
 * A single button, never a list of numbers: tapping it opens a small picker
 * listing every line from `contact.phones`, each one a real `tel:` link so the
 * browser or the device handles the call. The two numbers therefore exist in
 * exactly one place (`lib/site-data`) and are never duplicated in a component.
 *
 * On small screens the picker is a bottom action sheet; from `sm` up it is a
 * popover anchored to the button. It is portalled to `<body>` so it can never
 * be clipped by a panel, a card or the footer's own overflow, and so opening it
 * cannot move anything that is already on screen.
 */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** No subscription needed: this only reports whether we are on the client. */
const subscribeToNothing = () => () => {}
const isClient = () => true
const isServer = () => false

type Mode = 'sheet' | 'popover'

type Placement = {
  top: number
  left: number
  width: number
  above: boolean
}

/** Popover geometry, in pixels. */
const PREFERRED_WIDTH = 320
const MIN_WIDTH = 240
const ESTIMATED_HEIGHT = 236
const EDGE_GAP = 10
const EDGE_MARGIN = 12

export function PhoneButton({
  className,
  children,
  icon = true,
  chevron = true,
  iconClassName,
  onSelect,
  'aria-label': ariaLabel,
}: {
  /** Button chrome, supplied by the caller so it fits its own surface. */
  className?: string
  /** Custom contents. Omit for the standard phone icon + "Call" + chevron. */
  children?: ReactNode
  /** Render the phone glyph. */
  icon?: boolean
  /** Render the disclosure chevron, which turns over while the picker is open. */
  chevron?: boolean
  /** Extra classes for the phone glyph, e.g. an accent colour. */
  iconClassName?: string
  /** Runs once a number is chosen — used to close a menu the button sits in. */
  onSelect?: () => void
  'aria-label'?: string
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('sheet')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const titleId = useId()
  const mounted = useSyncExternalStore(subscribeToNothing, isClient, isServer)
  const reduce = useReducedMotion()
  const wasOpen = useRef(false)

  const close = useCallback(() => setOpen(false), [])

  const toggle = useCallback(() => {
    if (open) {
      setOpen(false)
      return
    }
    // Measured at the moment of opening: the surface is chosen to suit the
    // viewport the visitor is actually using.
    setMode(window.matchMedia('(min-width: 40rem)').matches ? 'popover' : 'sheet')
    setOpen(true)
  }, [open])

  // Focus returns to the button once the picker has closed. Tracked by a ref so
  // it never runs on first render and pulls focus away from the page.
  useEffect(() => {
    if (open) {
      wasOpen.current = true
      return
    }
    if (!wasOpen.current) return
    wasOpen.current = false
    const timer = window.setTimeout(
      () => triggerRef.current?.focus({ preventScroll: true }),
      reduce ? 0 : DURATION.fast * 1000,
    )
    return () => window.clearTimeout(timer)
  }, [open, reduce])

  const button = (
    <button
      ref={triggerRef}
      type="button"
      onClick={toggle}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      aria-label={ariaLabel}
      className={cn('group', className)}
    >
      {icon ? (
        <FiPhone
          className={cn('h-4 w-4 shrink-0', iconClassName)}
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
      {children ?? <span className="min-w-0 truncate">Call</span>}
      {chevron ? (
        <FiChevronDown
          className="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 ease-brand group-aria-expanded:rotate-180"
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
    </button>
  )

  if (!mounted) return button

  return (
    <>
      {button}
      {createPortal(
        <AnimatePresence>
          {open ? (
            <PhonePicker
              key="phone-picker"
              mode={mode}
              panelId={panelId}
              titleId={titleId}
              triggerRef={triggerRef}
              onClose={close}
              onSelect={onSelect}
            />
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function PhonePicker({
  mode,
  panelId,
  titleId,
  triggerRef,
  onClose,
  onSelect,
}: {
  mode: Mode
  panelId: string
  titleId: string
  triggerRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
  onSelect?: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [placement, setPlacement] = useState<Placement | null>(null)
  const isSheet = mode === 'sheet'

  // Only the sheet covers the page, so only the sheet needs the page held still.
  useScrollLock(isSheet)

  /**
   * Keyboard and focus. The listener is registered in the capture phase so an
   * Escape that closes the picker never also reaches an enclosing surface — the
   * mobile navigation sheet, for instance — that would close the whole menu.
   */
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const items = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = items()[0]

    const focusTimer = window.setTimeout(
      () => (first ?? panel).focus({ preventScroll: true }),
      reduce ? 0 : 60,
    )

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = items()
      const start = focusable[0]
      const end = focusable[focusable.length - 1]
      if (!start || !end) return

      const active = document.activeElement
      const outside = !active || !panel.contains(active)

      if (event.shiftKey && (active === start || outside)) {
        event.preventDefault()
        end.focus()
      } else if (!event.shiftKey && (active === end || outside)) {
        event.preventDefault()
        start.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [onClose, reduce])

  // A tap anywhere else dismisses the popover. The sheet uses its own backdrop.
  useEffect(() => {
    if (isSheet) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (panelRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      onClose()
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [isSheet, onClose, triggerRef])

  /**
   * Anchored placement, measured before the first paint so the popover never
   * appears in the corner and jumps. Re-measured on scroll and resize, and
   * flipped above the button when there is no room below it.
   */
  useLayoutEffect(() => {
    if (isSheet) return

    const update = () => {
      const trigger = triggerRef.current
      if (!trigger) return

      const rect = trigger.getBoundingClientRect()
      const width = Math.min(Math.max(rect.width, MIN_WIDTH), PREFERRED_WIDTH)
      const spaceBelow = window.innerHeight - rect.bottom
      const above = spaceBelow < ESTIMATED_HEIGHT + EDGE_GAP && rect.top > spaceBelow

      const next: Placement = {
        width,
        above,
        top: above ? rect.top - EDGE_GAP : rect.bottom + EDGE_GAP,
        left: Math.min(
          Math.max(rect.left, EDGE_MARGIN),
          Math.max(EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN),
        ),
      }

      setPlacement((current) =>
        current &&
        current.top === next.top &&
        current.left === next.left &&
        current.width === next.width &&
        current.above === next.above
          ? current
          : next,
      )
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [isSheet, triggerRef])

  const transition = reduce ? { duration: 0 } : { duration: DURATION.fast, ease: EASE }

  const options = (
    <ul className="flex flex-col gap-2 p-3">
      {contact.phones.map((phone) => (
        <li key={phone.id}>
          <a
            href={`tel:${phone.tel}`}
            onClick={onSelect}
            className={cn(
              'group/option flex min-h-[3.75rem] w-full items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5',
              'text-left transition-[border-color,background-color,box-shadow] duration-200 ease-brand',
              'hover:border-azure-300 hover:bg-azure-50',
            )}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100">
              <FiPhone className="h-4 w-4" aria-hidden="true" focusable="false" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="sr-only">{phone.label}: </span>
              <span className="block text-[1rem] font-bold leading-tight tracking-[-0.015em] tabular-nums text-navy-900">
                {phone.display}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[0.75rem] leading-tight text-ink-muted">
                <FiClock className="h-3 w-3" aria-hidden="true" focusable="false" />
                Available {phone.hours}
              </span>
            </span>

            <FiChevronRight
              className="h-4 w-4 shrink-0 text-navy-300 transition-transform duration-200 ease-brand group-hover/option:translate-x-0.5"
              aria-hidden="true"
              focusable="false"
            />
          </a>
        </li>
      ))}
    </ul>
  )

  const header = (
    <div className="flex items-start gap-3 border-b border-line px-4 py-3.5">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
        <FiPhone className="h-4 w-4" aria-hidden="true" focusable="false" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="label-xs text-crimson-600">Call us</p>
        <h2
          id={titleId}
          className="mt-1 text-[0.9375rem] font-bold tracking-[-0.01em] text-navy-900"
        >
          Choose a number
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close number options"
        className="-mr-1.5 -mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-muted transition-colors duration-200 ease-brand hover:bg-navy-50 hover:text-navy-900"
      >
        <FiX className="h-4 w-4" aria-hidden="true" focusable="false" />
      </button>
    </div>
  )

  const footer = (
    <p className="border-t border-line px-4 pb-4 pt-3 text-[0.6875rem] leading-relaxed text-ink-muted">
      WhatsApp messages reach {contact.person} on {contact.whatsapp.display},{' '}
      {contact.whatsapp.hours}.
    </p>
  )

  if (isSheet) {
    return (
      <>
        <motion.div
          key="phone-picker-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-navy-900/50 backdrop-blur-[3px]"
          aria-hidden="true"
        />

        <motion.div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          variants={pickerSheetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          className={cn(
            'fixed inset-x-0 bottom-0 z-[95] mx-auto w-full max-w-[24rem] focus:outline-none',
            'rounded-t-panel border-t border-line bg-white shadow-lift',
            'pb-[max(1rem,env(safe-area-inset-bottom))]',
          )}
        >
          {header}
          {options}
          {footer}
        </motion.div>
      </>
    )
  }

  return (
    <motion.div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      variants={placement?.above ? pickerPopoverAboveVariants : pickerPopoverVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transition}
      style={{
        top: placement?.top ?? 0,
        left: placement?.left ?? 0,
        width: placement?.width ?? PREFERRED_WIDTH,
        transformOrigin: placement?.above ? 'bottom center' : 'top center',
        visibility: placement ? 'visible' : 'hidden',
      }}
      className="fixed z-[95] max-w-[calc(100vw-1.5rem)] rounded-panel border border-line bg-white shadow-lift focus:outline-none"
    >
      {header}
      {options}
      {footer}
    </motion.div>
  )
}
