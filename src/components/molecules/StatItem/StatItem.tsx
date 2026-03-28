'use client'

import { motion, type Variants } from 'framer-motion'
import type { Stat } from '@/types'

interface StatItemProps extends Stat {
  index: number
  inverted?: boolean
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

export function StatItem({ value, label, icon: Icon, index, inverted }: StatItemProps) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col items-center gap-2 text-center"
    >
      {Icon && <Icon size={28} className={inverted ? 'text-white/70' : 'text-brand-primary'} aria-hidden="true" />}
      <span className={`font-heading text-4xl font-bold ${inverted ? 'text-white' : 'text-brand-primary'}`}>
        {value}
      </span>
      <span className={`text-sm ${inverted ? 'text-white/70' : 'text-brand-text/70'}`}>
        {label}
      </span>
    </motion.div>
  )
}
