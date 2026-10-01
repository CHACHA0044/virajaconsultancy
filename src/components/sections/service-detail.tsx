import Link from 'next/link'
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import { BrandArcs } from '@/components/ui/brand-arcs'
import { ButtonLink } from '@/components/ui/button'
import { ContactActions } from '@/components/ui/contact-actions'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/reveal'
import { ServiceIcon } from '@/components/ui/service-icon'
import type { Service } from '@/lib/site-data'
import { contact, getServiceHref, services } from '@/lib/site-data'

/**
 * Shared layout for every `/services/<slug>` page: the category, what falls
 * under it, an honest boundary note, and a route back.
 *
 * The copy describes the category in general terms only. It never promises a
 * specific regulated service, an approval or an outcome.
 */
export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-12 pt-8 sm:pb-16 sm:pt-12">
        <BrandArcs className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 opacity-80 sm:h-96 sm:w-96" />

        <div className="shell relative">
          <Link
            href="/services"
            className="link-underline inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-muted transition-colors duration-200 ease-brand hover:text-navy-900"
          >
            <FiArrowLeft className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            All services
          </Link>

          <div className="mt-7 max-w-[44rem]">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-azure-50 text-navy-900 ring-1 ring-inset ring-azure-100">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>

            <p className="label-xs mt-6 text-crimson-600">Service area</p>

            <h1 className="mt-3 text-[clamp(1.875rem,7.2vw,3.25rem)] font-bold leading-[1.03] tracking-[-0.035em] text-navy-900">
              {service.name}
            </h1>

            <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-ink-soft sm:text-lg">
              {service.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                Contact us
                <FiArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
              </ButtonLink>
              <ButtonLink
                href="/services"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Back to services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="wash-azure border-y border-line py-12 sm:py-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <Reveal>
              <div>
                <h2 className="text-[clamp(1.25rem,3.6vw,1.625rem)] font-bold tracking-[-0.025em] text-navy-900">
                  What you can explore here
                </h2>

                <StaggerGroup className="mt-6 flex flex-col">
                  {service.explore.map((point) => (
                    <StaggerItem key={point}>
                      <div className="flex gap-3.5 border-t border-line py-4">
                        <FiCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                          aria-hidden="true"
                          focusable="false"
                        />
                        <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{point}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-panel border border-line bg-white p-6 sm:p-7">
                <p className="label-xs text-ink-muted">Worth knowing</p>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {service.guidance}
                </p>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[1rem] font-bold tracking-[-0.02em] text-navy-900">
                    {contact.person}
                  </p>
                  <p className="label-xs mt-2 text-ink-muted">Call / WhatsApp</p>

                  <ContactActions className="mt-3" />

                  <ButtonLink href="/contact" size="md" className="mt-3 w-full">
                    Contact us
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="shell">
          <h2 className="label-xs text-ink-muted">Other service areas</h2>

          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getServiceHref(item.slug)}
                  className="group/other flex min-h-14 items-center justify-between gap-3 rounded-card border border-line bg-white px-4 py-3 text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.04em] text-navy-800 transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:border-azure-300 hover:shadow-card"
                >
                  <span className="min-w-0">{item.name}</span>
                  <FiArrowRight
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 shrink-0 text-navy-300 transition-transform duration-300 ease-brand group-hover/other:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
