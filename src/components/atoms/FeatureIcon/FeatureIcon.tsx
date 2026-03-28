import { cn } from '@/lib/utils'
import type { IconType } from 'react-icons'

interface FeatureIconProps {
  icon: IconType
  className?: string
}

export function FeatureIcon({ icon: Icon, className }: FeatureIconProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10 shrink-0',
        className
      )}
      aria-hidden="true"
    >
      <Icon size={24} className="text-brand-primary" />
    </div>
  )
}
