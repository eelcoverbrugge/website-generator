'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { AboutBody } from '@/components/atoms/AboutBody'
import { AboutStats } from '@/components/molecules/AboutStats'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { CTAConfig, AboutStat } from '@/types'

interface AboutContentProps {
  sectionLabel?: string
  heading: string
  body: string
  stats?: AboutStat[]
  cta?: CTAConfig
  slideFrom?: 'left' | 'right'
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export function AboutContent({
  sectionLabel,
  heading,
  body,
  stats,
  cta,
}: AboutContentProps) {
  return (
    <motion.div
      className="flex flex-col gap-6 justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {sectionLabel && (
        <motion.div variants={itemVariants}>
          <SectionLabel text={sectionLabel} />
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <SectionHeading text={heading} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AboutBody text={body} />
      </motion.div>

      {stats && stats.length > 0 && (
        <motion.div variants={itemVariants}>
          <AboutStats stats={stats} />
        </motion.div>
      )}

      {cta && (
        <motion.div variants={itemVariants}>
          <HeroCTAButton label={cta.label} href={cta.href} />
        </motion.div>
      )}
    </motion.div>
  )
}
