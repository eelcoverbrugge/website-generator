import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterLinkProps {
  href: string
  label: string
  className?: string
}

export function FooterLink({ href, label, className }: FooterLinkProps) {
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'text-sm text-brand-text/70 hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
        className
      )}
    >
      {label}
    </Link>
  )
}
