import { FeaturesDefault, type FeaturesDefaultProps } from './FeaturesDefault'
import { FeaturesAlternating } from './FeaturesAlternating'
import { FeaturesHorizontalList } from './FeaturesHorizontalList'
import { FeaturesLargeCards } from './FeaturesLargeCards'

export type FeaturesVariant = 'default' | 'alternating' | 'horizontal-list' | 'large-cards'
export interface FeaturesProps extends FeaturesDefaultProps { variant?: FeaturesVariant }

/**
 * Features organism — 4 varianten
 * - 'default'         : 3-koloms icon grid (kaarten)
 * - 'alternating'     : full-width rijen, afwisselend links/rechts
 * - 'horizontal-list' : verticale lijst, icon links, tekst rechts
 * - 'large-cards'     : 2-koloms grid met grote, ruime kaarten
 */
export function Features({ variant = 'default', ...props }: FeaturesProps) {
  switch (variant) {
    case 'alternating':     return <FeaturesAlternating    {...props} />
    case 'horizontal-list': return <FeaturesHorizontalList {...props} />
    case 'large-cards':     return <FeaturesLargeCards     {...props} />
    default:                return <FeaturesDefault        {...props} />
  }
}
