import { cn } from '@/lib/utils'

interface HeroHeadlineProps {
  text: string
  className?: string
}

export function HeroHeadline({ text, className }: HeroHeadlineProps) {
  return (
    <h1
      className={cn(
        'font-heading text-4xl font-bold leading-tight tracking-tight text-brand-heading sm:text-5xl lg:text-6xl',
        className
      )}
    >
      {text}
    </h1>
  )
}
