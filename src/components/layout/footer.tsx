import Link from 'next/link'
import { FiArrowUpRight, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { BrandMark } from '@/components/ui/brand-mark'
import { BrandArcsMirror } from '@/components/ui/brand-arcs'
import { address, contact, navigation, services, site } from '@/lib/site-data'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="panel-navy relative isolate overflow-hidden text-white">
      <BrandArcsMirror className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72" />

      <div className="shell relative py-14 sm:py-16">
        <div className="grid gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark heightClass="h-9 lg:h-10" sizes="58px" />
              <span className="flex flex-col justify-center leading-none">
                <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-white">
                  {site.shortName}
                </span>
                <span className="mt-[3px] text-[0.625rem] font-medium tracking-[0.19em] text-azure-200/85">
                  CONSULTANCY
                </span>
              </span>
            </div>
            <p className="mt-5 text-[0.8125rem] font-semibold tracking-[0.14em] text-azure-200">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed text-azure-100/65">
              {site.categoryLine}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="label-xs text-azure-300">Navigation</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline inline-block text-[0.875rem] text-azure-100/80 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="label-xs text-azure-300">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href="/services"
                    className="link-underline inline-block text-[0.875rem] text-azure-100/80 transition-colors duration-200 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="label-xs text-azure-300">Contact</h2>
            <p className="mt-4 text-[0.875rem] font-semibold text-white">{contact.person}</p>

            <ul className="mt-3.5 flex flex-col gap-2.5">
              <li>
                <a
                  href={`tel:${contact.phone.tel}`}
                  className="inline-flex items-center gap-2.5 text-[0.875rem] tabular-nums text-azure-100/85 transition-colors duration-200 hover:text-white"
                >
                  <FiPhone
                    className="h-3.5 w-3.5 text-azure-300"
                    aria-hidden="true"
                    focusable="false"
                  />
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={contact.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[0.875rem] text-azure-100/85 transition-colors duration-200 hover:text-white"
                >
                  <FiMessageCircle
                    className="h-3.5 w-3.5 text-azure-300"
                    aria-hidden="true"
                    focusable="false"
                  />
                  WhatsApp
                  <FiArrowUpRight
                    className="h-3 w-3 opacity-60"
                    aria-hidden="true"
                    focusable="false"
                  />
                </a>
              </li>
              <li>
                <address className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-azure-100/70 not-italic">
                  <FiMapPin
                    className="mt-0.5 h-3.5 w-3.5 text-azure-300"
                    aria-hidden="true"
                    focusable="false"
                  />
                  <span>
                    {address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </li>
            </ul>

            <Link
              href="/address"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-azure-200 transition-colors duration-200 hover:text-white"
            >
              View location
              <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-azure-100/55">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/follow-us"
                className="text-[0.75rem] text-azure-100/70 transition-colors duration-200 hover:text-white"
              >
                Follow Us
              </Link>
            </li>
            {site.pillars.map((pillar) => (
              <li key={pillar} className="text-[0.75rem] text-azure-100/40">
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
