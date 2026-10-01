'use client'

import { useEffect } from 'react'

/**
 * Locks page scrolling while a small-screen surface is open, including on iOS
 * where `overflow: hidden` alone does not stop the page moving under the
 * overlay. The scroll offset is restored exactly on close.
 *
 * Every inline style it changes is captured first and put back verbatim, so it
 * composes: the number picker can open on top of the mobile navigation sheet
 * and each lock unwinds to the state the one below it left behind.
 */
export function useScrollLock(active: boolean) {
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
