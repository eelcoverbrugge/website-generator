import { cn } from '@/lib/utils'

interface PricingPriceProps {
  price: string
  period?: string
  className?: string
}

export function PricingPrice({ price, period, className }: PricingPriceProps) {
  return (
    <div className={cn('flex items-end gap-1', className)}>
      <span className="font-heading text-4xl font-bold text-brand-heading">{price}</span>
      {period && <span className="text-sm text-brand-text/60 mb-1">{period}</span>}
    </div>
  )
}
