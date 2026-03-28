import { cn } from '@/lib/utils'

interface SectionSubtextProps {
  text: string
  className?: string
}

export function SectionSubtext({ text, className }: SectionSubtextProps) {
  return (
    <p
      className={cn(
        'text-lg leading-relaxed text-brand-text/75 max-w-2xl',
        className
      )}
    >
      {text}
    </p>
  )
}
