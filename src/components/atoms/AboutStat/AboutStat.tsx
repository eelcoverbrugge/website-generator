import { cn } from '@/lib/utils'

interface AboutStatProps {
  value: string
  label: string
  className?: string
}

export function AboutStat({ value, label, className }: AboutStatProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-heading text-3xl font-bold text-brand-primary">
        {value}
      </span>
      <span className="text-sm text-brand-text/70">
        {label}
      </span>
    </div>
  )
}
