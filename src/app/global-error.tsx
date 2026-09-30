'use client'

import { useEffect } from 'react'
import { contact } from '@/lib/site-data'

/**
 * Last-resort boundary: replaces the whole document if the root layout itself
 * fails, so the visitor still gets a usable page instead of a blank screen.
 * Must render its own <html> and <body>.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          background: '#ffffff',
          color: '#0b1630',
        }}
      >
        <div style={{ maxWidth: '34rem', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#ce0a14',
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: '1rem 0 0',
              fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontWeight: 700,
              color: '#021d64',
            }}
          >
            This site could not be loaded
          </h1>
          <p
            style={{
              margin: '1rem 0 0',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              color: '#3a4767',
            }}
          >
            Please try again. If the problem continues, call or WhatsApp {contact.phone.display}.
          </p>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: '3rem',
                padding: '0 1.5rem',
                borderRadius: '999px',
                border: 0,
                background: '#021d64',
                color: '#ffffff',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                minHeight: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                borderRadius: '999px',
                border: '1px solid #d3dbec',
                background: '#ffffff',
                color: '#021d64',
                fontSize: '0.9375rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
