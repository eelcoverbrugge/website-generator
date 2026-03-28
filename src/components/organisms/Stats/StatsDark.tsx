'use client'

import { motion, type Variants } from 'framer-motion'
import type { StatsDefaultProps } from './StatsDefault'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const } }),
}

export function StatsDark({ sectionLabel, stats }: StatsDefaultProps) {
  return (
    <section aria-label="Statistieken" className="w-full bg-brand-heading py-14 sm:py-18">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {sectionLabel && <p className="text-center text-sm font-medium uppercase tracking-widest text-white/40 mb-10">{sectionLabel}</p>}
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col items-center gap-2 text-center"
            >
              {stat.icon && <stat.icon size={28} className="text-brand-primary" aria-hidden="true" />}
              <dt className="font-heading text-4xl font-bold text-white">{stat.value}</dt>
              <dd className="text-sm text-white/50">{stat.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
