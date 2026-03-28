'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { SectionSubtext } from '@/components/atoms/SectionSubtext'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import type { CtaSectionDefaultProps } from './CtaSectionDefault'

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' as const, staggerChildren: 0.1 },
  },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export function CtaSectionGradient({ heading, subtext, primaryCTA, secondaryCTA }: CtaSectionDefaultProps) {
  return (
    <section
      aria-label="Call to action"
      className="w-full bg-gradient-to-br from-brand-primary to-brand-secondary py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionHeading text={heading} className="text-white sm:text-4xl lg:text-5xl" />
          </motion.div>
          {subtext && (
            <motion.div variants={itemVariants}>
              <SectionSubtext text={subtext} className="text-white/80" />
            </motion.div>
          )}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <HeroCTAButton
              label={primaryCTA.label}
              href={primaryCTA.href}
              className="bg-white text-brand-primary hover:bg-white/90 focus-visible:ring-white"
            />
            {secondaryCTA && (
              <HeroSecondaryCTA
                label={secondaryCTA.label}
                href={secondaryCTA.href}
                className="border-white/40 text-white hover:border-white hover:bg-white/10 hover:text-white"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
