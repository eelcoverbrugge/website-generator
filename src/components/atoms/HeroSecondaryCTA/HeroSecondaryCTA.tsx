import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroSecondaryCTAProps {
  label: string
  href: string
  className?: string
}

export function HeroSecondaryCTA({ label, href, className }: HeroSecondaryCTAProps) {
  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      size="lg"
      variant="outline"
      className={cn(
        'border-brand-text/25 text-brand-text hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 px-8 py-3 text-base font-semibold transition-all duration-200',
        className
      )}
    >
      {label}
    </Button>
  )
}
