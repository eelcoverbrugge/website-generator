'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqConfig } from '@/types'

export interface FaqTwoColProps extends FaqConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const colVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function FaqTwoCol({ sectionLabel, heading, subtext, items }: FaqTwoColProps) {
  const mid = Math.ceil(items.length / 2)
  const leftItems = items.slice(0, mid)
  const rightItems = items.slice(mid)

  return (
    <section aria-labelledby="faq-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={colVariants}
            transition={{ delay: 0.1 }}
          >
            <Accordion multiple={false}>
              {leftItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-left-${i}`}>
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={colVariants}
            transition={{ delay: 0.2 }}
          >
            <Accordion multiple={false}>
              {rightItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-right-${i}`}>
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
