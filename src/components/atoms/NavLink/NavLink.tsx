import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
  className?: string
  onClick?: () => void
}

export function NavLink({ href, label, isActive, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'text-sm font-medium transition-colors duration-200 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
        isActive ? 'text-brand-primary' : 'text-brand-text',
        className
      )}
    >
      {label}
    </Link>
  )
}
