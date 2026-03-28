'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { PortfolioCard } from '@/components/molecules/PortfolioCard'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { PortfolioConfig } from '@/types'

export interface PortfolioFilterableProps extends PortfolioConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const filterBarVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15, ease: 'easeOut' as const } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeOut' as const } },
}

const ALL_LABEL = 'Alles'

export function PortfolioFilterable({ sectionLabel, heading, subtext, items, cta }: PortfolioFilterableProps) {
  // Derive unique categories preserving insertion order
  const categories = [ALL_LABEL, ...Array.from(new Set(items.map((item) => item.category)))]
  const [activeFilter, setActiveFilter] = useState<string>(ALL_LABEL)

  const filteredItems =
    activeFilter === ALL_LABEL ? items : items.filter((item) => item.category === activeFilter)

  return (
    <section aria-labelledby="portfolio-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-10 lg:mb-12"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={filterBarVariants}
          className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-12"
          role="group"
          aria-label="Filter op categorie"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                activeFilter === cat
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-background text-brand-text/70 border-border hover:border-brand-primary hover:text-brand-primary',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Filtered grid */}
        <div
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.title}
                role="listitem"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <PortfolioCard {...item} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
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
