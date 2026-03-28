import { NavbarDefault, type NavbarDefaultProps } from './NavbarDefault'
import { NavbarCentered } from './NavbarCentered'
import { NavbarTransparent } from './NavbarTransparent'
import { NavbarMinimal } from './NavbarMinimal'

export type NavbarVariant = 'default' | 'centered' | 'transparent' | 'minimal'

export interface NavbarProps extends NavbarDefaultProps {
  variant?: NavbarVariant
}

/**
 * Navbar organism — 4 varianten
 * - 'default'     : logo links, nav rechts, CTA, hamburger mobiel
 * - 'centered'    : logo gecentreerd, nav in tweede rij
 * - 'transparent' : start transparant (voor hero-afbeeldingen), wordt wit bij scrollen
 * - 'minimal'     : alleen logo + CTA, geen navigatielinks (voor landingspagina's)
 */
export function Navbar({ variant = 'default', ...props }: NavbarProps) {
  switch (variant) {
    case 'centered':    return <NavbarCentered    {...props} />
    case 'transparent': return <NavbarTransparent {...props} />
    case 'minimal':     return <NavbarMinimal     {...props} />
    default:            return <NavbarDefault     {...props} />
  }
}
