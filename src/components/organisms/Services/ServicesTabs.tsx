'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
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

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit:   { opacity: 0, y: -8,  transition: { duration: 0.2, ease: 'easeOut' as const } },
}

export function ServicesTabs({ sectionLabel, heading, subtext, services, cta }: ServicesDefaultProps) {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section aria-labelledby="services-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-10 lg:mb-14"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' as const }}
          role="tablist"
          aria-label="Diensten"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {services.map((service, i) => (
            <button
              key={service.title}
              role="tab"
              aria-selected={active === i}
              aria-controls={`service-panel-${i}`}
              id={`service-tab-${i}`}
              onClick={() => setActive(i)}
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                active === i
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-muted text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary'
              )}
            >
              {service.icon && (
                <service.icon
                  size={15}
                  aria-hidden="true"
                  className={cn(active === i ? 'text-white' : 'text-brand-primary')}
                />
              )}
              {service.title}
            </button>
          ))}
        </motion.div>

        {/* Panel — 2-column: icon + title left, description + link right */}
        <div className="relative min-h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`service-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${active}`}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="rounded-2xl border border-border bg-muted/30 p-8 sm:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: icon + title */}
                <div className="flex flex-col items-start gap-4">
                  {current.icon && (
                    <FeatureIcon icon={current.icon} className="w-16 h-16 rounded-2xl shrink-0" />
                  )}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-heading leading-tight">
                    {current.title}
                  </h3>
                </div>

                {/* Right: description + link */}
                <div className="flex flex-col gap-5">
                  <p className="text-brand-text/80 leading-relaxed text-base sm:text-lg">
                    {current.description}
                  </p>
                  {current.href && (
                    <Link
                      href={current.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:underline group"
                    >
                      Meer lezen
                      <MdArrowForward
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
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
