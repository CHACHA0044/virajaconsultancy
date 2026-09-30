import type { IconType } from 'react-icons'
import {
  FiBarChart2,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiTrendingUp,
} from 'react-icons/fi'
import type { ServiceIconKey } from '@/lib/site-data'

/**
 * One consistent outline icon family (Feather) across the whole site.
 * Imports are per-icon so only what is used reaches the bundle.
 */
const icons: Record<ServiceIconKey, IconType> = {
  legal: FiFileText,
  banking: FiCreditCard,
  finance: FiBarChart2,
  'real-estate': FiHome,
  'digital-marketing': FiTrendingUp,
}

export function ServiceIcon({ name, className }: { name: ServiceIconKey; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} aria-hidden="true" focusable="false" />
}
