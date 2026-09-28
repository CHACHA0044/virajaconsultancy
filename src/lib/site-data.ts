/**
 * Single source of truth for every piece of business information on the site.
 *
 * Nothing here may be invented: all values are verified business data.
 * Components and pages import from this file rather than hard-coding strings,
 * so the phone number, address and brand wording can only ever exist in one place.
 */

export const site = {
  name: 'VIRAJA CONSULTANCY',
  shortName: 'VIRAJA',
  /** From the existing Viraja Consultancy branding. */
  tagline: 'FOR A BRIGHTER TOMORROW',
  /** From the existing business card. */
  categoryLine: 'REAL ESTATE & DIGITAL MARKETING SOLUTIONS',
  /** Existing brand wording. */
  pillars: ['PROPERTY', 'MARKETING', 'GROWTH'] as const,
  brandStatement: 'ONE CONSULTANCY. MULTIPLE SOLUTIONS.',
  description:
    'Viraja Consultancy — real estate and digital marketing solutions. Legal, banking, finance, real estate, digital marketing, advertising and promotion. Lucknow, Uttar Pradesh.',
} as const

export const contact = {
  person: 'AJAY DEMBLA',
  /** The only phone number used anywhere on this site. */
  phone: {
    /** Human readable. */
    display: '+91 8577982391',
    /** `tel:` target. */
    tel: '+918577982391',
    /** Click-to-chat target. */
    whatsapp: 'https://wa.me/918577982391',
  },
} as const

/** Reproduced exactly as supplied — not corrected, normalised or reworded. */
export const address = {
  lines: [
    'Floor 1, Hall 3, 195, Sultan Complex,',
    'Behind Kaiserbagh Bus Stand,',
    'Lucknow, UP, 226001',
  ],
  city: 'Lucknow',
  region: 'UP',
  postcode: '226001',
  /** A single-line form for `aria-label`, `alt` text and link titles. */
  singleLine:
    'Floor 1, Hall 3, 195, Sultan Complex, Behind Kaiserbagh Bus Stand, Lucknow, UP, 226001',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.281212594173!2d80.92495631110003!3d26.853189576585404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd00276fb3d5%3A0xf11f07694978dbb1!2sSultan%20Complex!5e1!3m2!1sen!2sin!4v1790623971115!5m2!1sen!2sin',
  /** Derived directly from the verified address above. */
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sultan+Complex%2C+Kaiserbagh%2C+Lucknow%2C+UP%2C+226001',
} as const

/** Icon keys are resolved to React Icons in `components/ui/service-icon.tsx`. */
export type ServiceIconKey =
  'legal' | 'banking' | 'finance' | 'real-estate' | 'digital-marketing' | 'advertising'

export type Service = {
  readonly name: string
  /** A single short word restating the category. Adds no claims. */
  readonly descriptor: string
  readonly icon: ServiceIconKey
}

/** The service areas supplied for this website. No sub-services are invented. */
export const services: readonly Service[] = [
  { name: 'LEGAL', descriptor: 'Legal', icon: 'legal' },
  { name: 'BANKING', descriptor: 'Banking', icon: 'banking' },
  { name: 'FINANCE', descriptor: 'Finance', icon: 'finance' },
  { name: 'REAL ESTATE', descriptor: 'Property', icon: 'real-estate' },
  { name: 'DIGITAL MARKETING', descriptor: 'Marketing', icon: 'digital-marketing' },
  { name: 'ADVERTISING & PROMOTION', descriptor: 'Promotion', icon: 'advertising' },
] as const

export type SocialPlatform = 'facebook' | 'instagram'

export type SocialLink = {
  readonly platform: SocialPlatform
  readonly label: string
  readonly handle: string
  readonly href: string
}

/**
 * Verified social profiles only.
 *
 * Adding a platform here is the single edit needed to publish it on /follow-us.
 * Entries are never generated, guessed or auto-derived.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Facebook',
    handle: 'virajaconsultancy',
    href: 'https://www.facebook.com/profile.php?id=61594786980129',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@virajaconsultancy',
    href: 'https://www.instagram.com/virajaconsultancy/',
  },
] as const

export type NavItem = {
  readonly href: `/${string}` | '/'
  readonly label: string
}

export const navigation: readonly NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/vision', label: 'Vision' },
  { href: '/address', label: 'Address' },
  { href: '/contact', label: 'Contact' },
  { href: '/follow-us', label: 'Follow Us' },
] as const

/** Absolute site origin, resolved per environment. Never a hard-coded dev URL. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, '')}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
