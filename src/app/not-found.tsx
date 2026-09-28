import Link from 'next/link'
import { FiArrowRight, FiHome } from 'react-icons/fi'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { BrandMark } from '@/components/ui/brand-mark'
import { navigation } from '@/lib/site-data'

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <BrandArcs className="pointer-events-none absolute -right-24 -top-20 h-64 w-64" />

      <div className="shell relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <BrandMark heightClass="h-16 sm:h-20" sizes="115px" className="mb-10" />

        <p className="label-xs text-crimson-600">Error 404</p>

        <h1 className="mt-5 text-[clamp(2rem,7vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-navy-900">
          This page could not be found
        </h1>

        <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          The page you were looking for does not exist or has moved. Try one of the links below.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-navy-800"
          >
            <FiHome className="h-4 w-4" aria-hidden="true" focusable="false" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-6 text-[0.9375rem] font-semibold text-navy-900 transition-colors duration-200 hover:border-azure-400 hover:bg-azure-50"
          >
            Contact us
            <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
          </Link>
        </div>

        <nav
          aria-label="Suggested pages"
          className="mt-12 w-full max-w-lg border-t border-line pt-8"
        >
          <p className="label-xs text-ink-muted">Or visit</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
            {navigation
              .filter((item) => item.href !== '/')
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[0.875rem] font-medium text-ink-soft transition-colors duration-200 hover:text-navy-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
