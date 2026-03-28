import { FooterHeading } from '@/components/atoms/FooterHeading'
import { FooterLink } from '@/components/atoms/FooterLink'
import type { FooterColumn as FooterColumnType } from '@/types'

interface FooterColumnProps extends FooterColumnType {}

export function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <FooterHeading>{heading}</FooterHeading>
      <ul className="space-y-3" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  )
}
