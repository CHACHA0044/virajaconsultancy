/** Shared motion language. Every animation in the site uses these values. */

/** Matches `--ease-brand` in globals.css. */
export const EASE = [0.22, 0.61, 0.36, 1] as const

export const DURATION = {
  fast: 0.24,
  base: 0.5,
  slow: 0.62,
} as const

/** Distance travelled by a reveal. Kept small so nothing feels slow. */
export const REVEAL_DISTANCE = 14

export const revealVariants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0 },
} as const

export const groupVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
} as const

/** Drawer / sheet transition for the mobile navigation. */
export const drawerVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, x: 24, transition: { duration: DURATION.fast, ease: EASE } },
} as const

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE } },
} as const

/** IntersectionObserver settings — reveal a little before the element is centred. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
