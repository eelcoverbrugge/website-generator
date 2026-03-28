import { LogoStripDefault, type LogoStripDefaultProps } from './LogoStripDefault'
import { LogoStripScrolling } from './LogoStripScrolling'
import { LogoStripGrid } from './LogoStripGrid'
import { LogoStripDark } from './LogoStripDark'

export type LogoStripVariant = 'default' | 'scrolling' | 'grid' | 'dark'
export interface LogoStripProps extends LogoStripDefaultProps { variant?: LogoStripVariant }

/**
 * LogoStrip — 4 varianten
 * - 'default'   : statische rij, grayscale logos
 * - 'scrolling' : oneindig scrollende marquee-animatie
 * - 'grid'      : responsive grid met bordered logo-kaartjes
 * - 'dark'      : donkere achtergrond, witte/inverted logos
 */
export function LogoStrip({ variant = 'default', ...props }: LogoStripProps) {
  switch (variant) {
    case 'scrolling': return <LogoStripScrolling {...props} />
    case 'grid':      return <LogoStripGrid      {...props} />
    case 'dark':      return <LogoStripDark      {...props} />
    default:          return <LogoStripDefault   {...props} />
  }
}
