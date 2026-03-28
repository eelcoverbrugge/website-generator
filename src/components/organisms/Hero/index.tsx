import { HeroDefault, type HeroDefaultProps } from './HeroDefault'
import { HeroCentered } from './HeroCentered'
import { HeroStacked } from './HeroStacked'
import { HeroBold } from './HeroBold'

export type HeroVariant = 'default' | 'centered' | 'stacked' | 'bold'

export interface HeroProps extends HeroDefaultProps {
  variant?: HeroVariant
}

/**
 * Hero organism — kies een variant via de `variant` prop.
 *
 * Varianten:
 * - 'default'  : tekst links, beeld rechts (split 50/50)
 * - 'centered' : full-bleed achtergrondafbeelding met overlay, alles gecentreerd, witte tekst
 * - 'stacked'  : full-width beeld bovenaan, tekst 2-koloms eronder (editoriaal)
 * - 'bold'     : merk-kleur paneel links met mega-typografie, beeld rechts (geen overlay)
 *
 * Alle varianten gebruiken dezelfde props:
 * @param badge        - Optionele badge boven de headline
 * @param headline     - Hoofdtitel (h1)
 * @param subtext      - Korte omschrijving
 * @param primaryCTA   - { label, href }
 * @param secondaryCTA - Optioneel { label, href }
 * @param image        - { src, alt }
 * @param variant      - 'default' | 'centered' | 'stacked' | 'bold'
 *
 * @example
 * <Hero
 *   variant="bold"
 *   badge="Gratis adviesgesprek"
 *   headline="Meer klanten, minder gedoe"
 *   subtext="Wij bouwen websites die converteren. Snel, betaalbaar en op maat voor jouw bedrijf."
 *   primaryCTA={{ label: 'Gratis offerte aanvragen', href: '/contact' }}
 *   secondaryCTA={{ label: 'Bekijk ons werk', href: '/portfolio' }}
 *   image={{ src: '/hero.jpg', alt: 'Team aan het werk' }}
 * />
 */
export function Hero({ variant = 'default', ...props }: HeroProps) {
  switch (variant) {
    case 'centered': return <HeroCentered {...props} />
    case 'stacked':  return <HeroStacked  {...props} />
    case 'bold':     return <HeroBold     {...props} />
    case 'default':
    default:         return <HeroDefault  {...props} />
  }
}
