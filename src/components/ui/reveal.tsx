'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { DURATION, EASE, REVEAL_DISTANCE, revealVariants, viewportOnce } from '@/lib/motion'

/**
 * Scroll reveal for a single block. Transform + opacity only, fires once, and
 * collapses to a plain render when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = REVEAL_DISTANCE,
}: {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Wraps a list so its children reveal in sequence. Pair with <StaggerItem>.
 * Kept deliberately small: one observer for the whole group, not one per card.
 */
export function StaggerGroup({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      transition={{ duration: DURATION.slow, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export { revealVariants }
