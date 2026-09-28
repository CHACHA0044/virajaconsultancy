import type { IconType } from 'react-icons'
import { FiCreditCard, FiFileText, FiHome, FiPieChart, FiRadio, FiShare2 } from 'react-icons/fi'
import type { ServiceIconKey } from '@/lib/site-data'

/**
 * One consistent outline icon family (Feather) across the whole site.
 * Imports are per-icon so only what is used reaches the bundle.
 */
const icons: Record<ServiceIconKey, IconType> = {
  legal: FiFileText,
  banking: FiCreditCard,
  finance: FiPieChart,
  'real-estate': FiHome,
  'digital-marketing': FiShare2,
  advertising: FiRadio,
}

const labels: Record<ServiceIconKey, string> = {
  legal: 'Legal',
  banking: 'Banking',
  finance: 'Finance',
  'real-estate': 'Real estate',
  'digital-marketing': 'Digital marketing',
  advertising: 'Advertising and promotion',
}

export function ServiceIcon({ name, className }: { name: ServiceIconKey; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} aria-hidden="true" focusable="false" />
}

export function serviceIconLabel(name: ServiceIconKey): string {
  return labels[name]
}
