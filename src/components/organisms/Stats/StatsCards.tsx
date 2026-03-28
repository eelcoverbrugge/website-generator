'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import type { StatsDefaultProps } from './StatsDefault'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const } }),
}

export function StatsCards({ sectionLabel, stats }: StatsDefaultProps) {
  return (
    <section aria-label="Statistieken" className="w-full bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {sectionLabel && <div className="text-center mb-8"><SectionLabel text={sectionLabel} /></div>}
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-6 text-center shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              {stat.icon && <stat.icon size={28} className="text-brand-primary" aria-hidden="true" />}
              <dt className="font-heading text-4xl font-bold text-brand-primary">{stat.value}</dt>
              <dd className="text-sm text-brand-text/70">{stat.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
