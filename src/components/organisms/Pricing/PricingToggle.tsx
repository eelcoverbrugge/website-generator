'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { PricingCard } from '@/components/molecules/PricingCard'
import { cn } from '@/lib/utils'
import type { PricingConfig, PricingTier } from '@/types'

export interface PricingToggleProps extends PricingConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const toggleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: 'easeOut' as const } },
}

const gridVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' as const } },
}

const YEARLY_DISCOUNT = 0.8 // 20% off

function deriveYearlyPrice(monthlyPrice: string): string {
  // Try to parse a numeric value from the price string (e.g. "€ 49", "49", "€49/mo")
  const match = monthlyPrice.match(/[\d,.]+/)
  if (!match) return monthlyPrice

  const numStr = match[0].replace(',', '.')
  const monthly = parseFloat(numStr)
  if (isNaN(monthly)) return monthlyPrice

  const yearly = Math.round(monthly * 12 * YEARLY_DISCOUNT)
  // Re-insert currency symbol if present
  const currencyMatch = monthlyPrice.match(/[€$£]/)
  const currency = currencyMatch ? currencyMatch[0] : ''
  return `${currency}${yearly}`
}

export function PricingToggle({ sectionLabel, heading, subtext, tiers }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false)

  const displayTiers: PricingTier[] = tiers.map((tier) => {
    if (!isYearly) return tier
    const yearlyPrice = deriveYearlyPrice(tier.price)
    return {
      ...tier,
      price: yearlyPrice,
      period: tier.period ? `${tier.period} (jaarlijks)` : 'jaarlijks',
    }
  })

  return (
    <section aria-labelledby="pricing-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
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

        {/* Toggle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={toggleVariants}
          className="mb-10 lg:mb-14 flex items-center justify-center gap-4"
        >
          <span className={cn('text-sm font-medium transition-colors', !isYearly ? 'text-brand-heading' : 'text-brand-text/50')}>
            Maandelijks
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Schakel tussen maandelijks en jaarlijks"
            onClick={() => setIsYearly((v) => !v)}
            className={cn(
              'relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
              isYearly ? 'bg-brand-primary' : 'bg-brand-text/20'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200',
                isYearly ? 'translate-x-7' : 'translate-x-0'
              )}
            />
          </button>

          <span className={cn('flex items-center gap-2 text-sm font-medium transition-colors', isYearly ? 'text-brand-heading' : 'text-brand-text/50')}>
            Jaarlijks
            <span className="inline-flex items-center rounded-full bg-brand-accent px-2 py-0.5 text-xs font-semibold text-white">
              -20%
            </span>
          </span>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={gridVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start"
        >
          {displayTiers.map((tier, i) => (
            <PricingCard key={tier.name} {...tier} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
