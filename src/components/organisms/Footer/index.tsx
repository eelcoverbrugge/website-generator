import { FooterDefault, type FooterDefaultProps } from './FooterDefault'
import { FooterMinimal } from './FooterMinimal'
import { FooterDark } from './FooterDark'
import { FooterNewsletter } from './FooterNewsletter'

export type FooterVariant = 'default' | 'minimal' | 'dark' | 'newsletter'
export interface FooterProps extends FooterDefaultProps { variant?: FooterVariant }

/**
 * Footer organism — 4 varianten
 * - 'default'    : 4-koloms met logo, nav, contact, socials
 * - 'minimal'    : compacte enkele rij
 * - 'dark'       : donkere achtergrond (brand-heading), witte tekst
 * - 'newsletter' : nieuwsbrief strip bovenaan + standaard footer
 */
export function Footer({ variant = 'default', ...props }: FooterProps) {
  switch (variant) {
    case 'minimal':    return <FooterMinimal    {...props} />
    case 'dark':       return <FooterDark       {...props} />
    case 'newsletter': return <FooterNewsletter {...props} />
    default:           return <FooterDefault    {...props} />
  }
}
