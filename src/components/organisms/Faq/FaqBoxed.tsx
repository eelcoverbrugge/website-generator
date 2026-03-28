'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { FaqConfig } from '@/types'

export interface FaqBoxedProps extends FaqConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

export function FaqBoxed({ sectionLabel, heading, subtext, items }: FaqBoxedProps) {
  return (
    <section aria-labelledby="faq-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <h3 className="font-heading text-base font-bold text-brand-heading mb-3">
                {item.question}
              </h3>
              <p className="text-sm text-brand-text/80 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
