import { PortfolioDefault, type PortfolioDefaultProps } from './PortfolioDefault'
import { PortfolioMasonry } from './PortfolioMasonry'
import { PortfolioCaseStudies } from './PortfolioCaseStudies'
import { PortfolioFilterable } from './PortfolioFilterable'

export type PortfolioVariant = 'default' | 'masonry' | 'case-studies' | 'filterable'
export interface PortfolioProps extends PortfolioDefaultProps {
  variant?: PortfolioVariant
}

/**
 * Portfolio organism
 *
 * @example
 * <Portfolio
 *   variant="default"
 *   sectionLabel="Ons werk"
 *   heading="Recente projecten"
 *   items={[
 *     { title: 'Bakkerij De Wit', category: 'Webdesign', image: { src: '/portfolio/bakkerij.jpg', alt: 'Bakkerij De Wit website' }, href: 'https://bakkerij-dewit.nl' },
 *   ]}
 *   cta={{ label: 'Alle projecten', href: '/portfolio' }}
 * />
 */
export function Portfolio({ variant = 'default', ...props }: PortfolioProps) {
  switch (variant) {
    case 'masonry':
      return <PortfolioMasonry {...props} />
    case 'case-studies':
      return <PortfolioCaseStudies {...props} />
    case 'filterable':
      return <PortfolioFilterable {...props} />
    case 'default':
    default:
      return <PortfolioDefault {...props} />
  }
}
