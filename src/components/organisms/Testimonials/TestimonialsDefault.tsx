'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { TestimonialCard } from '@/components/molecules/TestimonialCard'
import type { TestimonialsConfig } from '@/types'

export interface TestimonialsDefaultProps extends TestimonialsConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function TestimonialsDefault({ sectionLabel, heading, subtext, testimonials }: TestimonialsDefaultProps) {
  return (
    <section aria-labelledby="testimonials-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.authorName} role="listitem">
              <TestimonialCard {...t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
