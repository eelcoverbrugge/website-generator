'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import type { FeaturesDefaultProps } from './FeaturesDefault'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const } }),
}

export function FeaturesHorizontalList({ sectionLabel, heading, subtext, features }: FeaturesDefaultProps) {
  return (
    <section aria-labelledby="features-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={headerVariants} className="mb-12 lg:mb-16">
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 max-w-4xl mx-auto" role="list">
          {features.map((feature, i) => (
            <motion.li
              key={feature.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex items-start gap-4"
            >
              <FeatureIcon icon={feature.icon} className="shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-brand-heading">{feature.title}</h3>
                <p className="text-sm text-brand-text/70 leading-relaxed">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
