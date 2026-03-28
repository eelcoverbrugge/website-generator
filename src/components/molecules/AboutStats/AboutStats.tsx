import { AboutStat } from '@/components/atoms/AboutStat'
import type { AboutStat as AboutStatType } from '@/types'

interface AboutStatsProps {
  stats: AboutStatType[]
}

export function AboutStats({ stats }: AboutStatsProps) {
  return (
    <dl className="flex flex-wrap gap-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <AboutStat value={stat.value} label={stat.label} />
        </div>
      ))}
    </dl>
  )
}
