import { cn } from '@/lib/utils'

interface HeroSubtextProps {
  text: string
  className?: string
}

export function HeroSubtext({ text, className }: HeroSubtextProps) {
  return (
    <p
      className={cn(
        'text-lg leading-relaxed text-brand-text/80 sm:text-xl max-w-xl',
        className
      )}
    >
      {text}
    </p>
  )
}
