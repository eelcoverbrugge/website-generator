'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import type { StatsDefaultProps } from './StatsDefault'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function StatsCentered({ sectionLabel, stats }: StatsDefaultProps) {
  return (
    <section aria-label="Statistieken" className="w-full bg-muted/30 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        {sectionLabel && <div className="mb-10"><SectionLabel text={sectionLabel} /></div>}
        <motion.dl
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {stats.map(stat => (
            <motion.div key={stat.label} variants={itemVariants} className="flex flex-col items-center gap-2">
              <dt className="font-heading text-5xl sm:text-6xl font-black text-brand-primary leading-none">{stat.value}</dt>
              <dd className="text-sm font-medium text-brand-text/60 uppercase tracking-wide">{stat.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
