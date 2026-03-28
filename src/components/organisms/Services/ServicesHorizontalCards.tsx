'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { MdArrowForward } from 'react-icons/md'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { cn } from '@/lib/utils'
import type { ServicesDefaultProps } from './ServicesDefault'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const } }),
}

export function ServicesHorizontalCards({ sectionLabel, heading, subtext, services, cta }: ServicesDefaultProps) {
  return (
    <section aria-labelledby="services-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={headerVariants} className="mb-12 lg:mb-16">
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="left" />
        </motion.div>

        <ul className="flex flex-col divide-y divide-border" role="list">
          {services.map((service, i) => {
            const inner = (
              <div className="flex items-center gap-6 py-6 sm:py-8 group">
                {service.icon && <FeatureIcon icon={service.icon} className="shrink-0 w-14 h-14 rounded-2xl" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-brand-heading mb-1 group-hover:text-brand-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-brand-text/70 leading-relaxed">{service.description}</p>
                </div>
                {service.href && (
                  <MdArrowForward size={22} className="shrink-0 text-brand-text/30 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-200" aria-hidden="true" />
                )}
              </div>
            )
            return (
              <motion.li key={service.title} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
                {service.href ? (
                  <Link href={service.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">{inner}</Link>
                ) : inner}
              </motion.li>
            )
          })}
        </ul>

        {cta && (
          <div className="mt-10">
            <HeroCTAButton label={cta.label} href={cta.href} />
          </div>
        )}
      </div>
    </section>
  )
}
