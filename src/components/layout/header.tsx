'use client'

import { useCallback, useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu } from 'react-icons/fi'
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

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/92 backdrop-blur-md',
        'transition-[border-color,box-shadow] duration-300 ease-brand',
        condensed && !open ? 'border-line shadow-header' : 'border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <BrandLink priority />

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
            className="hidden h-10 items-center rounded-full bg-navy-900 px-5 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-navy-800 sm:inline-flex lg:hidden xl:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 transition-colors duration-200 hover:border-navy-300 hover:bg-navy-50 lg:hidden"
          >
            <FiMenu className="h-5 w-5" aria-hidden="true" focusable="false" />
          </button>
        </div>
      </div>

      <MobileNav open={open} onClose={close} labelledBy={menuLabelId} />
    </header>
  )
}
