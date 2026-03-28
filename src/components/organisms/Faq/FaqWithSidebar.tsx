'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqConfig } from '@/types'

export interface FaqWithSidebarProps extends FaqConfig {}

const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const listVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' as const } },
}

export function FaqWithSidebar({ sectionLabel, heading, subtext, items }: FaqWithSidebarProps) {
  return (
    <section aria-labelledby="faq-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Sidebar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={sidebarVariants}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <SectionHeader
              label={sectionLabel}
              heading={heading}
              subtext={subtext}
              align="left"
            />
            <div className="pt-2">
              <HeroCTAButton label="Neem contact op" href="/contact" />
              <p className="mt-3 text-sm text-brand-text/60">Nog vragen? We helpen je graag verder.</p>
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={listVariants}
            className="lg:w-2/3"
          >
            <Accordion multiple={false}>
              {items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-base font-medium text-brand-heading py-4 hover:no-underline hover:text-brand-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-text/80 leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
