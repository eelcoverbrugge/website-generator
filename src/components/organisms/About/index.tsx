import { AboutDefault, type AboutDefaultProps } from './AboutDefault'
import { AboutCentered } from './AboutCentered'
import { AboutWithValues } from './AboutWithValues'
import { AboutDarkPanel } from './AboutDarkPanel'

export type AboutVariant = 'default' | 'centered' | 'with-values' | 'dark-panel'
export interface AboutProps extends AboutDefaultProps { variant?: AboutVariant }

/**
 * About organism — 4 varianten
 * - 'default'     : split tekst/beeld, imagePosition prop
 * - 'centered'    : alles gecentreerd, beeld eronder
 * - 'with-values' : tekst links, 3 kernwaarden rechts (geen foto)
 * - 'dark-panel'  : donker beeld-paneel links, witte tekst rechts
 */
export function About({ variant = 'default', ...props }: AboutProps) {
  switch (variant) {
    case 'centered':    return <AboutCentered    {...props} />
    case 'with-values': return <AboutWithValues  {...props} />
    case 'dark-panel':  return <AboutDarkPanel   {...props} />
    default:            return <AboutDefault     {...props} />
  }
}
