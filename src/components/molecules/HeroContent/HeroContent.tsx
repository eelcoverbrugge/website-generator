'use client'

import { motion, type Variants } from 'framer-motion'
import { HeroBadge } from '@/components/atoms/HeroBadge'
import { HeroHeadline } from '@/components/atoms/HeroHeadline'
import { HeroSubtext } from '@/components/atoms/HeroSubtext'
import { HeroCTAGroup } from '@/components/molecules/HeroCTAGroup'
import type { CTAConfig } from '@/types'

interface HeroContentProps {
  badge?: string
  headline: string
  subtext: string
  primaryCTA: CTAConfig
  secondaryCTA?: CTAConfig
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function HeroContent({ badge, headline, subtext, primaryCTA, secondaryCTA }: HeroContentProps) {
  return (
    <motion.div
      className="flex flex-col gap-6 justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {badge && (
        <motion.div variants={itemVariants}>
          <HeroBadge text={badge} />
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <HeroHeadline text={headline} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HeroSubtext text={subtext} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HeroCTAGroup primary={primaryCTA} secondary={secondaryCTA} />
      </motion.div>
    </motion.div>
  )
}
