'use client'

import { motion, type Variants } from 'framer-motion'
import { AboutContent } from '@/components/molecules/AboutContent'
import type { AboutDefaultProps } from './AboutDefault'

// Hard-code values that supplement the body text
const defaultValues = [
  { title: 'Eerlijkheid', text: 'Geen vage beloftes. Wij zijn transparant over wat we doen en wat het kost.' },
  { title: 'Kwaliteit', text: 'Elke website wordt gebouwd met aandacht voor detail, snelheid en toegankelijkheid.' },
  { title: 'Resultaat', text: 'We meten succes in klanten voor jou, niet in uren voor ons.' },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const } }),
}

export function AboutWithValues({ sectionLabel, heading, body, stats, cta }: AboutDefaultProps) {
  return (
    <section aria-labelledby="about-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: standard text content */}
          <AboutContent sectionLabel={sectionLabel} heading={heading} body={body} stats={stats} cta={cta} />

          {/* Right: values cards */}
          <div className="flex flex-col gap-4">
            {defaultValues.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="rounded-2xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-heading mb-1">{value.title}</h3>
                    <p className="text-sm text-brand-text/70 leading-relaxed">{value.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
