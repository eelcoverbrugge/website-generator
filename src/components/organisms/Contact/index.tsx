import { ContactDefault, type ContactDefaultProps } from './ContactDefault'
import { ContactFormOnly } from './ContactFormOnly'
import { ContactDarkPanel } from './ContactDarkPanel'
import { ContactMinimal } from './ContactMinimal'

export type ContactVariant = 'default' | 'form-only' | 'dark-panel' | 'minimal'
export interface ContactProps extends ContactDefaultProps {
  variant?: ContactVariant
}

/**
 * Contact organism
 *
 * @example
 * <Contact
 *   variant="default"
 *   sectionLabel="Contact"
 *   heading="Neem contact op"
 *   subtext="Heb je een vraag of wil je een offerte? We horen graag van je."
 *   info={{
 *     address: 'Voorbeeldstraat 1, 1234 AB Amsterdam',
 *     phone: '020 123 4567',
 *     email: 'info@bedrijf.nl',
 *     openingHours: 'Ma–Vr: 9:00–17:00',
 *   }}
 * />
 */
export function Contact({ variant = 'default', ...props }: ContactProps) {
  switch (variant) {
    case 'form-only':
      return <ContactFormOnly {...props} />
    case 'dark-panel':
      return <ContactDarkPanel {...props} />
    case 'minimal':
      return <ContactMinimal {...props} />
    case 'default':
    default:
      return <ContactDefault {...props} />
  }
}
