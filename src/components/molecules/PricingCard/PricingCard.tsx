'use client'

import { motion, type Variants } from 'framer-motion'
import { MdCheck, MdClose } from 'react-icons/md'
import { PricingPrice } from '@/components/atoms/PricingPrice'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types'

interface PricingCardProps extends PricingTier {
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

export function PricingCard({ name, price, period, description, features, cta, highlighted, index }: PricingCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-8 shadow-sm transition-shadow duration-300',
        highlighted
          ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
          : 'border-border bg-background hover:shadow-md'
      )}
    >
      {highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
          Meest gekozen
        </span>
      )}

      <div className="flex flex-col gap-4 mb-8">
        <h3 className={cn('font-heading text-xl font-bold', highlighted ? 'text-white' : 'text-brand-heading')}>
          {name}
        </h3>
        <PricingPrice
          price={price}
          period={period}
          className={highlighted ? '[&>span:first-child]:text-white [&>span:last-child]:text-white/70' : ''}
        />
        {description && (
          <p className={cn('text-sm leading-relaxed', highlighted ? 'text-white/80' : 'text-brand-text/70')}>
            {description}
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-3 flex-1 mb-8" role="list" aria-label={`Features van ${name}`}>
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-3 text-sm">
            {f.included
              ? <MdCheck size={18} className={cn('mt-0.5 shrink-0', highlighted ? 'text-white' : 'text-brand-primary')} aria-hidden="true" />
              : <MdClose size={18} className={cn('mt-0.5 shrink-0', highlighted ? 'text-white/40' : 'text-brand-text/30')} aria-hidden="true" />
            }
            <span className={cn(highlighted ? 'text-white' : f.included ? 'text-brand-text' : 'text-brand-text/40')}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {highlighted
        ? <HeroCTAButton label={cta.label} href={cta.href} className="w-full justify-center bg-white text-brand-primary hover:bg-white/90" />
        : <HeroSecondaryCTA label={cta.label} href={cta.href} className="w-full justify-center" />
      }
    </motion.div>
  )
}
