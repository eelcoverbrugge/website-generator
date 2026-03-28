'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { ContactConfig } from '@/types'

export interface ContactFormOnlyProps extends ContactConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' as const } },
}

export function ContactFormOnly({ sectionLabel, heading, subtext }: ContactFormOnlyProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section aria-labelledby="contact-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div className="max-w-lg mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-10 text-center"
            >
              <p className="text-2xl font-heading font-bold text-brand-heading">Bedankt!</p>
              <p className="text-brand-text/70">We nemen zo snel mogelijk contact met je op.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm"
              aria-label="Contactformulier"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="fo-name" className="text-sm font-medium text-brand-heading">
                  Naam <span aria-hidden="true" className="text-brand-primary">*</span>
                </label>
                <input
                  id="fo-name"
                  name="name"
                  type="text"
                  placeholder="Jan de Vries"
                  required
                  autoComplete="name"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fo-email" className="text-sm font-medium text-brand-heading">
                  E-mailadres <span aria-hidden="true" className="text-brand-primary">*</span>
                </label>
                <input
                  id="fo-email"
                  name="email"
                  type="email"
                  placeholder="jan@bedrijf.nl"
                  required
                  autoComplete="email"
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fo-message" className="text-sm font-medium text-brand-heading">
                  Bericht <span aria-hidden="true" className="text-brand-primary">*</span>
                </label>
                <textarea
                  id="fo-message"
                  name="message"
                  placeholder="Vertel ons wat je nodig hebt..."
                  required
                  rows={5}
                  className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
              >
                Verstuur bericht
              </button>

              <p className="text-xs text-brand-text/50 text-center">
                Door te versturen ga je akkoord met ons{' '}
                <a href="/privacy" className="underline hover:text-brand-primary">privacybeleid</a>.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}
