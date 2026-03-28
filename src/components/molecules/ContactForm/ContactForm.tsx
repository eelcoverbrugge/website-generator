'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const formVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Koppel hier je eigen form handler / API route aan
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-10 text-center h-full min-h-[320px]"
      >
        <p className="text-2xl font-heading font-bold text-brand-heading">Bedankt! 🎉</p>
        <p className="text-brand-text/70">We nemen zo snel mogelijk contact met je op.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm"
      aria-label="Contactformulier"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Naam <span aria-hidden="true" className="text-brand-primary">*</span></Label>
          <Input id="contact-name" name="name" type="text" placeholder="Jan de Vries" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">E-mailadres <span aria-hidden="true" className="text-brand-primary">*</span></Label>
          <Input id="contact-email" name="email" type="email" placeholder="jan@bedrijf.nl" required autoComplete="email" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-phone">Telefoonnummer</Label>
        <Input id="contact-phone" name="phone" type="tel" placeholder="06 12 34 56 78" autoComplete="tel" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Bericht <span aria-hidden="true" className="text-brand-primary">*</span></Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Vertel ons wat je nodig hebt..."
          required
          rows={5}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        className="bg-brand-primary text-white hover:bg-brand-primary/90 w-full font-semibold"
      >
        Verstuur bericht
      </Button>

      <p className="text-xs text-brand-text/50 text-center">
        Door te versturen ga je akkoord met ons{' '}
        <a href="/privacy" className="underline hover:text-brand-primary">privacybeleid</a>.
      </p>
    </motion.form>
  )
}
