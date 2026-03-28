import { cn } from '@/lib/utils'

interface FeatureDescriptionProps {
  text: string
  className?: string
}

export function FeatureDescription({ text, className }: FeatureDescriptionProps) {
  return (
    <p
      className={cn(
        'text-sm leading-relaxed text-brand-text/70',
        className
      )}
    >
      {text}
    </p>
  )
}
