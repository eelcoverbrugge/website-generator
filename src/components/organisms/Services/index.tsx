import { ServicesDefault, type ServicesDefaultProps } from './ServicesDefault'
import { ServicesHorizontalCards } from './ServicesHorizontalCards'
import { ServicesAccordion } from './ServicesAccordion'
import { ServicesTabs } from './ServicesTabs'

export type ServicesVariant = 'default' | 'horizontal-cards' | 'accordion' | 'tabs'
export interface ServicesProps extends ServicesDefaultProps { variant?: ServicesVariant }

/**
 * Services organism — 4 varianten
 * - 'default'          : 3-koloms kaartgrid
 * - 'horizontal-cards' : horizontale lijst met pijl, links-rechts layout
 * - 'accordion'        : uitklaplijst via shadcn Accordion
 * - 'tabs'             : tabbladen bovenaan, paneel eronder
 */
export function Services({ variant = 'default', ...props }: ServicesProps) {
  switch (variant) {
    case 'horizontal-cards': return <ServicesHorizontalCards {...props} />
    case 'accordion':        return <ServicesAccordion       {...props} />
    case 'tabs':             return <ServicesTabs            {...props} />
    default:                 return <ServicesDefault         {...props} />
  }
}
