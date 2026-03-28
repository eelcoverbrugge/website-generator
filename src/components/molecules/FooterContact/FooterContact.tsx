import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'
import { FooterHeading } from '@/components/atoms/FooterHeading'
import { FooterLink } from '@/components/atoms/FooterLink'

interface FooterContactProps {
  address?: string
  phone?: string
  email?: string
}

export function FooterContact({ address, phone, email }: FooterContactProps) {
  if (!address && !phone && !email) return null

  return (
    <div>
      <FooterHeading>Contact</FooterHeading>
      <address className="not-italic space-y-3">
        {address && (
          <p className="flex items-start gap-2 text-sm text-brand-text/70">
            <MdLocationOn size={16} className="mt-0.5 shrink-0 text-brand-primary" aria-hidden="true" />
            <span>{address}</span>
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-2">
            <MdPhone size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />
            <FooterLink href={`tel:${phone.replace(/\s/g, '')}`} label={phone} />
          </p>
        )}
        {email && (
          <p className="flex items-center gap-2">
            <MdEmail size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />
            <FooterLink href={`mailto:${email}`} label={email} />
          </p>
        )}
      </address>
    </div>
  )
}
