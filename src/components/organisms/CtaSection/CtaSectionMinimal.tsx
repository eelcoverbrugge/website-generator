'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import type { CtaSectionDefaultProps } from './CtaSectionDefault'

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function CtaSectionMinimal({ heading, primaryCTA, secondaryCTA }: CtaSectionDefaultProps) {
  return (
    <section
      aria-label="Call to action"
      className="w-full bg-background border-y border-border py-10 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeVariants}
        >
          {/* Heading — takes available space on desktop */}
          <SectionHeading
            text={heading}
            className="lg:text-3xl shrink-0"
          />

          {/* Buttons — row on desktop, stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <HeroCTAButton label={primaryCTA.label} href={primaryCTA.href} />
            {secondaryCTA && (
              <HeroSecondaryCTA label={secondaryCTA.label} href={secondaryCTA.href} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
