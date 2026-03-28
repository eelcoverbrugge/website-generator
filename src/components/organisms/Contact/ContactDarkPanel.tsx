'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { ContactConfig } from '@/types'

export interface ContactDarkPanelProps extends ContactConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const formVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const infoItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1 + i * 0.08, ease: 'easeOut' as const },
  }),
}

export function ContactDarkPanel({ sectionLabel, heading, subtext, info }: ContactDarkPanelProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  const infoItems = [
    { icon: MdLocationOn, label: 'Adres', value: info?.address, href: undefined },
    {
      icon: MdPhone,
      label: 'Telefoon',
      value: info?.phone,
      href: info?.phone ? `tel:${info.phone.replace(/\s/g, '')}` : undefined,
    },
    {
      icon: MdEmail,
      label: 'E-mail',
      value: info?.email,
      href: info?.email ? `mailto:${info.email}` : undefined,
    },
    { icon: MdAccessTime, label: 'Openingstijden', value: info?.openingHours, href: undefined },
  ].filter((item) => item.value)

  return (
    <section aria-labelledby="contact-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] overflow-hidden rounded-2xl border border-border shadow-md">
          {/* Dark panel – left 40% on lg */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={panelVariants}
            className="flex flex-col justify-between gap-8 bg-brand-heading p-8 sm:p-10"
          >
            <div>
              <h2 className="font-heading font-bold text-xl text-white mb-2">
                Contactgegevens
              </h2>
              <p className="text-sm text-white/60">
                Neem gerust contact met ons op.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {infoItems.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={infoItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 shrink-0">
                    <Icon size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white hover:text-brand-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form – right 60% on lg */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={formVariants}
            className="bg-white p-8 sm:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-8 text-center"
              >
                <p className="text-2xl font-heading font-bold text-brand-heading">Bedankt!</p>
                <p className="text-brand-text/70">We nemen zo snel mogelijk contact met je op.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 h-full"
                aria-label="Contactformulier"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dp-name" className="text-sm font-medium text-brand-heading">
                      Naam <span aria-hidden="true" className="text-brand-primary">*</span>
                    </label>
                    <input
                      id="dp-name"
                      name="name"
                      type="text"
                      placeholder="Jan de Vries"
                      required
                      autoComplete="name"
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dp-email" className="text-sm font-medium text-brand-heading">
                      E-mailadres <span aria-hidden="true" className="text-brand-primary">*</span>
                    </label>
                    <input
                      id="dp-email"
                      name="email"
                      type="email"
                      placeholder="jan@bedrijf.nl"
                      required
                      autoComplete="email"
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dp-phone" className="text-sm font-medium text-brand-heading">
                    Telefoonnummer
                  </label>
                  <input
                    id="dp-phone"
                    name="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    autoComplete="tel"
                    className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="dp-message" className="text-sm font-medium text-brand-heading">
                    Bericht <span aria-hidden="true" className="text-brand-primary">*</span>
                  </label>
                  <textarea
                    id="dp-message"
                    name="message"
                    placeholder="Vertel ons wat je nodig hebt..."
                    required
                    rows={5}
                    className="resize-none flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
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
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
