'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { cn } from '@/lib/utils'
import type { PricingConfig } from '@/types'

export interface PricingTableProps extends PricingConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const tableVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' as const } },
}

export function PricingTable({ sectionLabel, heading, subtext, tiers }: PricingTableProps) {
  // Collect all unique feature labels across all tiers
  const allFeatures = Array.from(
    new Set(tiers.flatMap((tier) => tier.features.map((f) => f.text)))
  )

  return (
    <section aria-labelledby="pricing-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={tableVariants}
          className="overflow-x-auto rounded-2xl border border-border shadow-sm"
        >
          <table className="w-full min-w-[640px] border-collapse bg-background">
            <thead>
              <tr>
                {/* Feature column header */}
                <th className="w-48 border-b border-border bg-background px-6 py-5 text-left text-sm font-semibold text-brand-text/60 sm:w-56">
                  Functies
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className={cn(
                      'border-b border-border px-6 py-5 text-center',
                      tier.highlighted
                        ? 'bg-brand-primary text-white'
                        : 'bg-background'
                    )}
                  >
                    <span
                      className={cn(
                        'block font-heading text-lg font-bold',
                        tier.highlighted ? 'text-white' : 'text-brand-heading'
                      )}
                    >
                      {tier.name}
                    </span>
                    <span
                      className={cn(
                        'block text-2xl font-bold mt-1',
                        tier.highlighted ? 'text-white' : 'text-brand-primary'
                      )}
                    >
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span
                        className={cn(
                          'block text-xs mt-0.5',
                          tier.highlighted ? 'text-white/70' : 'text-brand-text/60'
                        )}
                      >
                        {tier.period}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allFeatures.map((featureText, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={cn(
                    'border-b border-border last:border-0',
                    rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <td className="px-6 py-4 text-sm text-brand-text font-medium">
                    {featureText}
                  </td>
                  {tiers.map((tier) => {
                    const match = tier.features.find((f) => f.text === featureText)
                    const included = match?.included ?? false
                    return (
                      <td
                        key={tier.name}
                        className={cn(
                          'px-6 py-4 text-center text-lg',
                          tier.highlighted ? 'bg-brand-primary/10' : ''
                        )}
                      >
                        {included ? (
                          <span
                            className={cn(
                              'inline-flex items-center justify-center font-bold',
                              tier.highlighted ? 'text-brand-primary' : 'text-brand-primary'
                            )}
                            aria-label="Inbegrepen"
                          >
                            ✓
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center text-brand-text/30"
                            aria-label="Niet inbegrepen"
                          >
                            ✗
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-border">
                <td className="px-6 py-5" />
                {tiers.map((tier) => (
                  <td key={tier.name} className={cn('px-6 py-5 text-center', tier.highlighted ? 'bg-brand-primary/10' : '')}>
                    {tier.highlighted
                      ? <HeroCTAButton label={tier.cta.label} href={tier.cta.href} className="w-full justify-center" />
                      : <HeroSecondaryCTA label={tier.cta.label} href={tier.cta.href} className="w-full justify-center" />
                    }
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
