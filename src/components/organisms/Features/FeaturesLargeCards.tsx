'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import type { FeaturesDefaultProps } from './FeaturesDefault'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const } }),
}

export function FeaturesLargeCards({ sectionLabel, heading, subtext, features }: FeaturesDefaultProps) {
  return (
    <section aria-labelledby="features-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={headerVariants} className="mb-12 lg:mb-16">
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              role="listitem"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-background p-8 lg:p-10 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <FeatureIcon icon={feature.icon} className="w-14 h-14 rounded-2xl" />
              <h3 className="font-heading text-xl font-bold text-brand-heading">{feature.title}</h3>
              <p className="text-brand-text/75 leading-relaxed">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
