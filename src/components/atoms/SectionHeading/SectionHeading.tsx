import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  text: string
  className?: string
}

export function SectionHeading({ text, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'font-heading text-3xl font-bold tracking-tight text-brand-heading sm:text-4xl',
        className
      )}
    >
      {text}
    </h2>
  )
}
