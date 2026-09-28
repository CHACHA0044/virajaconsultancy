'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { FiRefreshCw } from 'react-icons/fi'
import { ButtonLink } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // No analytics are loaded on this site, so surface the error in the console only.
    console.error('Route error:', error)
  }, [error])

  return (
    <section className="bg-white">
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <p className="label-xs text-crimson-600">Something went wrong</p>

        <h1 className="mt-5 text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-navy-900">
          This page could not be loaded
        </h1>

        <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          An unexpected error interrupted the page. You can try again, or reach us directly.
        </p>

        {error.digest ? (
          <p className="mt-4 text-[0.75rem] text-ink-muted">Reference: {error.digest}</p>
        ) : null}

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-navy-800"
          >
            <FiRefreshCw className="h-4 w-4" aria-hidden="true" focusable="false" />
            Try again
          </button>
          <ButtonLink href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">
            Contact us
          </ButtonLink>
        </div>

        <Link
          href="/"
          className="link-underline mt-8 text-[0.875rem] font-medium text-ink-soft hover:text-navy-900"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
