import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import type { Service } from '@/lib/site-data'
import { getServiceHref } from '@/lib/site-data'
import { ServiceIcon } from '@/components/ui/service-icon'
import { cn } from '@/lib/utils'

/**
 * A service category card. The whole card is one link to the service's own
 * page: icon, name, one neutral sentence and an explore affordance. The name
 * is never repeated, and nothing here claims a specific deliverable.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: Service
  index?: number
  className?: string
}) {
  return (
    <Link
      href={getServiceHref(service.slug)}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-5 sm:p-6',
        'transition-[transform,border-color,box-shadow] duration-300 ease-brand',
        'hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift',
        'focus-visible:-translate-y-1 focus-visible:border-azure-400',
        className,
      )}
    >
      {/* Top edge picks up the brand gradient on hover. */}
      <span
        aria-hidden="true"
        className="brand-rule absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-brand group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex items-center justify-between gap-3">
  <div className="flex items-center gap-4">
    <span
    className={cn(
      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
      'bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100',
      'transition-[background-color,color,box-shadow,transform] duration-300 ease-brand',
      'group-hover:-translate-y-0.5 group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900 group-focus-visible:-translate-y-0.5 group-focus-visible:bg-navy-900 group-focus-visible:text-white',
    )}
  >
    <ServiceIcon
      name={service.icon}
      className="h-[1.25rem] w-[1.25rem] transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:scale-105 group-focus-visible:-translate-y-0.5 group-focus-visible:rotate-[-5deg] group-focus-visible:scale-105"
    />
  </span>

    <h3 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.02em] text-navy-900">
      {service.name}
    </h3>
  </div>

  {/* {typeof index === 'number' ? (
    <span
    className={cn(
      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
      'bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100',
      'transition-[background-color,color,box-shadow,transform] duration-300 ease-brand',
      'group-hover:-translate-y-0.5 group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900 group-focus-visible:-translate-y-0.5 group-focus-visible:bg-navy-900 group-focus-visible:text-white',
    )}
  >
    <ServiceIcon
      name={service.icon}
      className="h-[1.25rem] w-[1.25rem] transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:scale-105 group-focus-visible:-translate-y-0.5 group-focus-visible:rotate-[-5deg] group-focus-visible:scale-105"
    />
  </span>
  ) : null} */}
</div>

      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">{service.summary}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy-500">
        Explore
        <FiArrowUpRight
          aria-hidden="true"
          focusable="false"
          className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1 group-hover:-translate-y-0.5 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-0.5"
        />
      </span>
    </Link>
  )
}
