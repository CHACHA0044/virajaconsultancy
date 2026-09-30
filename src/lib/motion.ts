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

/**
 * Mobile navigation panel. A short lift from the top edge only — no large
 * sliding surface and no spring, so it stays cheap to composite and to close.
 * Transitions are passed in as props so the component can drop them entirely
 * when the visitor prefers reduced motion.
 */
export const drawerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
} as const

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const

/**
 * Staggered contents of the mobile navigation. Transform and opacity only, so
 * the whole sheet animates on the compositor without triggering layout.
 * Built per render so the stagger can collapse when reduced motion is on.
 */
export function drawerGroupVariants(staggerChildren: number, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren, ease: EASE, duration: DURATION.fast },
    },
    exit: {
      transition: {
        staggerChildren: staggerChildren / 3,
        staggerDirection: -1 as const,
        ease: EASE,
        duration: DURATION.fast,
      },
    },
  }
}

export const drawerItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
} as const

/** IntersectionObserver settings — reveal a little before the element is centred. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
