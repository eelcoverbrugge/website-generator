'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { PortfolioCard } from '@/components/molecules/PortfolioCard'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { PortfolioConfig } from '@/types'

export interface PortfolioDefaultProps extends PortfolioConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function PortfolioDefault({ sectionLabel, heading, subtext, items, cta }: PortfolioDefaultProps) {
  return (
    <section aria-labelledby="portfolio-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} role="listitem">
              <PortfolioCard {...item} index={i} />
            </div>
          ))}
        </div>

        {cta && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <HeroCTAButton label={cta.label} href={cta.href} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
