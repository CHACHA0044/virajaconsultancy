import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { getServiceHref, services } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/**
 * A hairline list of the service areas, each one a link to its own page.
 *
 * Deliberately plain: no icons, no descriptions, no card chrome. It introduces
 * the service areas without duplicating the services directory.
 */
export function ServiceAreaList({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:[&>li:not(:nth-child(2n))]:border-r',
        className,
      )}
    >
      {services.map((service) => (
        <li key={service.slug} className="border-b border-line">
          <Link
            href={getServiceHref(service.slug)}
            className="group/area flex min-h-14 items-center justify-between gap-3 py-3.5 pr-2 text-[0.9375rem] font-semibold uppercase tracking-[0.03em] text-navy-800 transition-colors duration-200 ease-brand hover:text-navy-900 sm:px-4 sm:text-base"
          >
            <span className="min-w-0">{service.name}</span>
            <FiChevronRight
              aria-hidden="true"
              focusable="false"
              className="h-4 w-4 shrink-0 text-navy-300 transition-transform duration-200 ease-brand group-hover/area:translate-x-0.5 group-hover/area:text-crimson-600"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
