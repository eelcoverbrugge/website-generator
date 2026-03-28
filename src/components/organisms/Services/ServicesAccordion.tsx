'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { ServicesDefaultProps } from './ServicesDefault'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function ServicesAccordion({ sectionLabel, heading, subtext, services, cta }: ServicesDefaultProps) {
  return (
    <section aria-labelledby="services-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={headerVariants} className="mb-12 lg:mb-14">
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }}
          className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm"
        >
          <Accordion multiple={false}>
            {services.map((service, i) => (
              <AccordionItem key={service.title} value={`service-${i}`}>
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {service.icon && <FeatureIcon icon={service.icon} className="w-10 h-10 rounded-xl shrink-0" />}
                    <span className="font-semibold text-brand-heading">{service.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-brand-text/75 leading-relaxed">
                  {service.description}
                  {service.href && (
                    <a href={service.href} className="block mt-3 text-sm font-medium text-brand-primary hover:underline">
                      Meer lezen →
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {cta && (
          <div className="mt-10 flex justify-center">
            <HeroCTAButton label={cta.label} href={cta.href} />
          </div>
        )}
      </div>
    </section>
  )
}
