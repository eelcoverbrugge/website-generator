import { FaqDefault, type FaqDefaultProps } from './FaqDefault'
import { FaqTwoCol } from './FaqTwoCol'
import { FaqBoxed } from './FaqBoxed'
import { FaqWithSidebar } from './FaqWithSidebar'

export type FaqVariant = 'default' | 'two-col' | 'boxed' | 'with-sidebar'
export interface FaqProps extends FaqDefaultProps {
  variant?: FaqVariant
}

/**
 * FAQ organism
 *
 * @example
 * <Faq
 *   variant="default"
 *   sectionLabel="Veelgestelde vragen"
 *   heading="Alles wat je wilt weten"
 *   items={[
 *     { question: 'Wat kost een website?', answer: 'Dat hangt af van de wensen. Neem contact op voor een gratis offerte.' },
 *     { question: 'Hoe lang duurt het?', answer: 'Een standaard website is binnen 4 weken live.' },
 *   ]}
 * />
 *
 * Variants:
 * - "default"      — centered single-column accordion
 * - "two-col"      — accordion split into two columns
 * - "boxed"        — always-expanded cards in a 2-col grid
 * - "with-sidebar" — left sidebar with header + CTA, right accordion
 */
export function Faq({ variant = 'default', ...props }: FaqProps) {
  switch (variant) {
    case 'two-col':
      return <FaqTwoCol {...props} />
    case 'boxed':
      return <FaqBoxed {...props} />
    case 'with-sidebar':
      return <FaqWithSidebar {...props} />
    case 'default':
    default:
      return <FaqDefault {...props} />
  }
}
