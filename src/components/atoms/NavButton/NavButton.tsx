import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavButtonProps {
  label: string
  href: string
  className?: string
}

export function NavButton({ label, href, className }: NavButtonProps) {
  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      className={cn(
        'bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary font-medium transition-all duration-200',
        className
      )}
    >
      {label}
    </Button>
  )
}
