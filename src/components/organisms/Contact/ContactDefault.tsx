'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ContactForm } from '@/components/molecules/ContactForm'
import { ContactInfo } from '@/components/molecules/ContactInfo'
import type { ContactConfig } from '@/types'

export interface ContactDefaultProps extends ContactConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function ContactDefault({ sectionLabel, heading, subtext, info }: ContactDefaultProps) {
  return (
    <section aria-labelledby="contact-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">
          {info && (
            <div>
              <ContactInfo {...info} />
            </div>
          )}
          <div className={!info ? 'max-w-2xl mx-auto w-full' : ''}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
