import { cn } from '@/lib/utils'

interface SectionLabelProps {
  text: string
  className?: string
}

export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block text-sm font-semibold uppercase tracking-widest text-brand-primary',
        className
      )}
    >
      {text}
    </span>
  )
}
