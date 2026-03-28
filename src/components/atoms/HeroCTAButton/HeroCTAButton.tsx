import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroCTAButtonProps {
  label: string
  href: string
  className?: string
}

export function HeroCTAButton({ label, href, className }: HeroCTAButtonProps) {
  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      size="lg"
      className={cn(
        'bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary px-8 py-3 text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md',
        className
      )}
    >
      {label}
    </Button>
  )
}
