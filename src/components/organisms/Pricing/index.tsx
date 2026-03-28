import { PricingDefault, type PricingDefaultProps } from './PricingDefault'
import { PricingTable } from './PricingTable'
import { PricingTwoTier } from './PricingTwoTier'
import { PricingToggle } from './PricingToggle'

export type PricingVariant = 'default' | 'table' | 'two-tier' | 'toggle'
export interface PricingProps extends PricingDefaultProps {
  variant?: PricingVariant
}

/**
 * Pricing organism
 *
 * @example
 * <Pricing
 *   variant="default"
 *   sectionLabel="Tarieven"
 *   heading="Transparante prijzen"
 *   tiers={[
 *     { name: 'Starter', price: '€ 499', period: 'eenmalig', features: [{ text: '5 pagina\'s', included: true }], cta: { label: 'Kies Starter', href: '/contact' } },
 *     { name: 'Business', price: '€ 999', period: 'eenmalig', highlighted: true, features: [{ text: '10 pagina\'s', included: true }], cta: { label: 'Kies Business', href: '/contact' } },
 *   ]}
 * />
 *
 * Variants:
 * - "default"   — responsive card grid (1–3 columns)
 * - "table"     — feature comparison table, horizontally scrollable on mobile
 * - "two-tier"  — two large side-by-side cards (only first 2 tiers used)
 * - "toggle"    — monthly/yearly toggle with 20% yearly discount
 */
export function Pricing({ variant = 'default', ...props }: PricingProps) {
  switch (variant) {
    case 'table':
      return <PricingTable {...props} />
    case 'two-tier':
      return <PricingTwoTier {...props} />
    case 'toggle':
      return <PricingToggle {...props} />
    case 'default':
    default:
      return <PricingDefault {...props} />
  }
}
