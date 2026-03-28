'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import { cn } from '@/lib/utils'
import type { FeaturesDefaultProps } from './FeaturesDefault'

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const } }),
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function FeaturesAlternating({ sectionLabel, heading, subtext, features }: FeaturesDefaultProps) {
  return (
    <section aria-labelledby="features-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={headerVariants} className="mb-12 lg:mb-16">
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div className="flex flex-col divide-y divide-border">
          {features.map((feature, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className={cn(
                  'grid grid-cols-1 gap-6 py-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:items-center',
                  !isEven && 'lg:[&>*:first-child]:order-2'
                )}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-4">
                  <FeatureIcon icon={feature.icon} className="w-14 h-14 rounded-2xl shrink-0" />
                  <h3 className="font-heading text-2xl font-bold text-brand-heading">{feature.title}</h3>
                </div>
                {/* Description */}
                <p className="text-brand-text/75 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
