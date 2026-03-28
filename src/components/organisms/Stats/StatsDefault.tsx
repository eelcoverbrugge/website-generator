import { StatItem } from '@/components/molecules/StatItem'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { cn } from '@/lib/utils'
import type { StatsConfig } from '@/types'

export interface StatsDefaultProps extends StatsConfig {}

export function StatsDefault({ sectionLabel, stats, background = 'light' }: StatsDefaultProps) {
  const isPrimary = background === 'primary'

  return (
    <section
      aria-label="Statistieken"
      className={cn(
        'w-full py-12 sm:py-16',
        isPrimary ? 'bg-brand-primary' : 'bg-muted/40'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {sectionLabel && (
          <div className="text-center mb-8">
            <SectionLabel
              text={sectionLabel}
              className={cn(isPrimary && 'text-white/70')}
            />
          </div>
        )}
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <StatItem {...stat} index={i} inverted={isPrimary} />
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
