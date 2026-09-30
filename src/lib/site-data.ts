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
  /** The single sentence that says what the consultancy covers. */
  heroLine:
    'One consultancy for legal, banking, finance, real estate, and digital marketing & promotion.',
  /** The follow-on instruction, kept plain and non-promotional. */
  heroSupport: 'Explore the services and contact Viraja Consultancy to discuss your requirement.',
  /** The brand direction behind the vision page, in one short statement. */
  visionLine:
    'Viraja Consultancy exists to bring the service areas our clients need next under one name, and to keep the first conversation simple.',
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
export type ServiceIconKey = 'legal' | 'banking' | 'finance' | 'real-estate' | 'digital-marketing'

export type Service = {
  /** URL segment for `/services/<slug>`. */
  readonly slug: string
  readonly name: string
  readonly icon: ServiceIconKey
  /** One-line, category-level summary. Adds no claims about deliverables. */
  readonly summary: string
  /** What this service area is about, described in general terms. */
  readonly explore: readonly string[]
  /** An honest boundary: what this area is and is not. */
  readonly guidance: string
}

/**
 * The service areas supplied for this website.
 *
 * Copy rule: describe the category in general, informational terms only. No
 * specific regulated service, guarantee or outcome is claimed here, because
 * none has been confirmed for this business.
 */
export const services: readonly Service[] = [
  {
    slug: 'legal',
    name: 'LEGAL',
    icon: 'legal',
    summary: 'Documents, agreements and the paperwork that usually comes with them.',
    explore: [
      'Documents and agreements people commonly need read through before signing',
      'Notices, receipts and records worth keeping for later reference',
      'Which kind of professional a specific matter needs, and what to ask them',
    ],
    guidance:
      'Viraja Consultancy is a consultancy, not a law firm. Tell us what your requirement is and we will say plainly whether it falls within what we can help with.',
  },
  {
    slug: 'banking',
    name: 'BANKING',
    icon: 'banking',
    summary: 'Bank forms, statements and the process questions that come with them.',
    explore: [
      'The documents a bank typically asks for, and how to arrange them',
      'Forms, statements and reference details that an application depends on',
      'Who to approach at the bank, and what is worth asking for in writing',
    ],
    guidance:
      'We help you get the right information in front of the right desk. Accounts, offers and approvals always remain decisions for the bank itself.',
  },
  {
    slug: 'finance',
    name: 'FINANCE',
    icon: 'finance',
    summary: 'The numbers behind a money decision — costs, charges and planning.',
    explore: [
      'Understanding charges and fees, and where the money is actually going',
      'Comparing options before taking on a financial commitment',
      'Budgeting and planning questions for a business or a household',
    ],
    guidance:
      'Nothing here is investment advice, and no return is ever guaranteed. Talk to us about the information you need rather than about a promised outcome.',
  },
  {
    slug: 'real-estate',
    name: 'REAL ESTATE',
    icon: 'real-estate',
    summary: 'Property — buying, selling, renting and the documents that travel with it.',
    explore: [
      'Property details and what a listing does and does not confirm',
      'The documents usually needed to complete a sale, rent or handover',
      'The costs involved at each stage, so nothing arrives as a surprise',
    ],
    guidance:
      'Guidance and coordination are what we offer. Registration and legal transfer are carried out through the appropriate registered officials and professionals.',
  },
  {
    slug: 'digital-marketing',
    name: 'DIGITAL MARKETING & PROMOTION',
    icon: 'digital-marketing',
    summary: 'How a business is presented and found online, and how it is promoted.',
    explore: [
      'How a business appears and is found across search and social platforms',
      'Promotions, offers and campaigns, and how each one is planned and run',
      'The listings, profiles and content that customers actually see',
    ],
    guidance:
      'No campaign can promise a fixed number of leads, sales or growth. What we can do is be clear about the plan, the budget and what gets measured.',
  },
] as const

/**
 * The service areas written as a single sentence, so the wording used on the
 * home page, the services page and every detail page cannot drift apart.
 */
export const serviceAreaSentence =
  'legal, banking, finance, real estate, and digital marketing & promotion'

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServiceHref(slug: string): `/${string}` {
  return `/services/${slug}`
}

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'youtube'

export type SocialLink = {
  readonly platform: SocialPlatform
  readonly label: string
  readonly handle: string
  readonly href: string
}

/**
 * Verified social profiles only.
 *
 * This list is intentionally empty: no official profile has been confirmed for
 * this business, so none is published and none is guessed. Adding a verified
 * entry here is the single edit needed to publish it on /follow-us.
 */
export const socialLinks: readonly SocialLink[] = [] as const

/**
 * Platforms the follow-us page is ready to display. With no verified profile
 * these render as a clear "not yet" state rather than as broken links.
 */
export const socialPlatforms: readonly { platform: SocialPlatform; label: string }[] = [
  { platform: 'facebook', label: 'Facebook' },
  { platform: 'instagram', label: 'Instagram' },
  { platform: 'linkedin', label: 'LinkedIn' },
  { platform: 'youtube', label: 'YouTube' },
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
