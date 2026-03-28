import { cn } from '@/lib/utils'

interface FooterHeadingProps {
  children: React.ReactNode
  className?: string
}

export function FooterHeading({ children, className }: FooterHeadingProps) {
  return (
    <h3
      className={cn(
        'text-sm font-semibold text-brand-heading uppercase tracking-wider mb-4',
        className
      )}
    >
      {children}
    </h3>
  )
}
