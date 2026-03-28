import { cn } from '@/lib/utils'

interface FeatureTitleProps {
  text: string
  className?: string
}

export function FeatureTitle({ text, className }: FeatureTitleProps) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-brand-heading',
        className
      )}
    >
      {text}
    </h3>
  )
}
