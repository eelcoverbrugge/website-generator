'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureCard } from '@/components/molecules/FeatureCard'
import type { FeaturesConfig } from '@/types'

export interface FeaturesDefaultProps extends FeaturesConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function FeaturesDefault({
  sectionLabel,
  heading,
  subtext,
  features,
}: FeaturesDefaultProps) {
  return (
    <section
      aria-labelledby="features-heading"
      className="w-full bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader
            label={sectionLabel}
            heading={heading}
            subtext={subtext}
            align="center"
          />
        </motion.div>

        {/* Feature cards grid */}
        <div
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <div key={feature.title} role="listitem">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={i}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
