'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { SectionSubtext } from '@/components/atoms/SectionSubtext'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { cn } from '@/lib/utils'
import type { CTASectionConfig } from '@/types'

export interface CtaSectionDefaultProps extends CTASectionConfig {}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function CtaSectionDefault({ heading, subtext, primaryCTA, secondaryCTA, background = 'primary' }: CtaSectionDefaultProps) {
  const isPrimary = background === 'primary'

  return (
    <section
      aria-label="Call to action"
      className={cn(
        'w-full py-16 sm:py-20 lg:py-24',
        isPrimary ? 'bg-brand-primary' : 'bg-muted/40'
      )}
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
            <SectionHeading
              text={heading}
              className={cn('sm:text-4xl lg:text-5xl', isPrimary ? 'text-white' : 'text-brand-heading')}
            />
          </motion.div>

          {subtext && (
            <motion.div variants={itemVariants}>
              <SectionSubtext
                text={subtext}
                className={cn(isPrimary ? 'text-white/80' : 'text-brand-text/75')}
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <HeroCTAButton
              label={primaryCTA.label}
              href={primaryCTA.href}
              className={cn(isPrimary && 'bg-white text-brand-primary hover:bg-white/90 focus-visible:ring-white')}
            />
            {secondaryCTA && (
              <HeroSecondaryCTA
                label={secondaryCTA.label}
                href={secondaryCTA.href}
                className={cn(isPrimary && 'border-white/40 text-white hover:border-white hover:bg-white/10 hover:text-white')}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
