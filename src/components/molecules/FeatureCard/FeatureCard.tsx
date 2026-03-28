'use client'

import { motion, type Variants } from 'framer-motion'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import { FeatureTitle } from '@/components/atoms/FeatureTitle'
import { FeatureDescription } from '@/components/atoms/FeatureDescription'
import type { Feature } from '@/types'

interface FeatureCardProps extends Feature {
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.1,
      ease: 'easeOut' as const,
    },
  }),
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <FeatureIcon icon={icon} />
      <div className="flex flex-col gap-2">
        <FeatureTitle text={title} />
        <FeatureDescription text={description} />
      </div>
    </motion.article>
  )
}
