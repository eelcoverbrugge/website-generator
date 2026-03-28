'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { MdCheck, MdClose } from 'react-icons/md'
import { cn } from '@/lib/utils'
import type { PricingConfig, PricingTier } from '@/types'

export interface PricingTwoTierProps extends PricingConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const leftCardVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const rightCardVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function TwoTierCard({ tier, variants }: { tier: PricingTier; variants: Variants }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={variants}
      className={cn(
        'relative flex flex-col rounded-2xl border p-8 lg:p-10 shadow-sm transition-shadow duration-300',
        tier.highlighted
          ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
          : 'border-border bg-background hover:shadow-md'
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
          Meest gekozen
        </span>
      )}

      <div className="flex flex-col gap-4 mb-8">
        <h3 className={cn('font-heading text-2xl font-bold', tier.highlighted ? 'text-white' : 'text-brand-heading')}>
          {tier.name}
        </h3>
        <div className="flex items-end gap-1">
          <span className={cn('text-4xl font-bold', tier.highlighted ? 'text-white' : 'text-brand-primary')}>
            {tier.price}
          </span>
          {tier.period && (
            <span className={cn('mb-1 text-sm', tier.highlighted ? 'text-white/70' : 'text-brand-text/60')}>
              / {tier.period}
            </span>
          )}
        </div>
        {tier.description && (
          <p className={cn('text-sm leading-relaxed', tier.highlighted ? 'text-white/80' : 'text-brand-text/70')}>
            {tier.description}
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-3 flex-1 mb-8" role="list" aria-label={`Features van ${tier.name}`}>
        {tier.features.map((f) => (
          <li key={f.text} className="flex items-start gap-3 text-sm">
            {f.included
              ? <MdCheck size={18} className={cn('mt-0.5 shrink-0', tier.highlighted ? 'text-white' : 'text-brand-primary')} aria-hidden="true" />
              : <MdClose size={18} className={cn('mt-0.5 shrink-0', tier.highlighted ? 'text-white/40' : 'text-brand-text/30')} aria-hidden="true" />
            }
            <span className={cn(tier.highlighted ? 'text-white' : f.included ? 'text-brand-text' : 'text-brand-text/40')}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {tier.highlighted
        ? <HeroCTAButton label={tier.cta.label} href={tier.cta.href} className="w-full justify-center bg-white text-brand-primary hover:bg-white/90" />
        : <HeroSecondaryCTA label={tier.cta.label} href={tier.cta.href} className="w-full justify-center" />
      }
    </motion.div>
  )
}

export function PricingTwoTier({ sectionLabel, heading, subtext, tiers }: PricingTwoTierProps) {
  const [firstTier, secondTier] = tiers

  return (
    <section aria-labelledby="pricing-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start">
          {firstTier && <TwoTierCard tier={firstTier} variants={leftCardVariants} />}
          {secondTier && <TwoTierCard tier={secondTier} variants={rightCardVariants} />}
        </div>
      </div>
    </section>
  )
}
