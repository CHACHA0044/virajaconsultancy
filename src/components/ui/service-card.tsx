import type { Service } from '@/lib/site-data'
import { ServiceIcon } from '@/components/ui/service-icon'
import { cn } from '@/lib/utils'

/**
 * A service category card. Carries no claims — the name, one derived word,
 * an icon and an index. Interaction is a plain CSS transition.
 */
export function ServiceCard({
  service,
  index,
  className,
}: {
  service: Service
  index?: number
  className?: string
}) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-6',
        'transition-[transform,border-color,box-shadow] duration-300 ease-brand',
        'hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift',
        'sm:p-7',
        className,
      )}
    >
      {/* Top edge picks up the brand gradient on hover. */}
      <span
        aria-hidden="true"
        className="brand-rule absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-400 ease-brand group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-xl',
            'bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100',
            'transition-[background-color,color,transform] duration-300 ease-brand',
            'group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900',
          )}
        >
          <ServiceIcon name={service.icon} className="h-[1.375rem] w-[1.375rem]" />
        </span>

        {typeof index === 'number' ? (
          <span
            aria-hidden="true"
            className="label-xs pt-1.5 text-navy-300 tabular-nums transition-colors duration-300 group-hover:text-azure-400"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 text-[1.0625rem] font-bold leading-snug tracking-[-0.015em] text-navy-900 sm:text-lg">
        {service.name}
      </h3>

      <p className="label-xs mt-2.5 text-ink-muted">{service.descriptor}</p>
    </article>
  )
}
