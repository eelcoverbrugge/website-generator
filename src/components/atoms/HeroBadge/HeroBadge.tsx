import { cn } from '@/lib/utils'

interface HeroBadgeProps {
  text: string
  className?: string
}

export function HeroBadge({ text, className }: HeroBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-brand-primary/25 bg-brand-primary/8 px-3.5 py-1 text-xs font-semibold text-brand-primary tracking-wide',
        className
      )}
    >
      {text}
    </span>
  )
}
