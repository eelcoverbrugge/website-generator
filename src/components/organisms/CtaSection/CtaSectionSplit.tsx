'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { SectionSubtext } from '@/components/atoms/SectionSubtext'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import type { CtaSectionDefaultProps } from './CtaSectionDefault'

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const leftChildVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const leftItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}
const rightVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function CtaSectionSplit({ heading, subtext, primaryCTA, secondaryCTA }: CtaSectionDefaultProps) {
  return (
    <section aria-label="Call to action" className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-64">
        {/* Left: dark brand panel — heading + subtext */}
        <motion.div
          className="bg-brand-primary px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 flex items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={leftVariants}
        >
          <motion.div
            className="flex flex-col gap-5 max-w-lg"
            variants={leftChildVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.div variants={leftItemVariants}>
              <SectionHeading
                text={heading}
                className="text-white sm:text-4xl lg:text-5xl"
              />
            </motion.div>
            {subtext && (
              <motion.div variants={leftItemVariants}>
                <SectionSubtext text={subtext} className="text-white/80" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Right: white panel — CTA buttons stacked */}
        <motion.div
          className="bg-background px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 flex items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={rightVariants}
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <HeroCTAButton label={primaryCTA.label} href={primaryCTA.href} className="w-full justify-center" />
            {secondaryCTA && (
              <HeroSecondaryCTA label={secondaryCTA.label} href={secondaryCTA.href} className="w-full justify-center" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
