'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'
import type { FooterDefaultProps } from './FooterDefault'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const } }),
}

export function FooterNewsletter({ logo, tagline, columns, socials, contact, copyright }: FooterDefaultProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer role="contentinfo" className="bg-background border-t border-border">
      {/* Newsletter strip */}
      <div className="bg-brand-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-xl font-bold text-white">Blijf op de hoogte</p>
              <p className="text-sm text-white/75 mt-1">Ontvang tips, nieuws en aanbiedingen direct in je inbox.</p>
            </div>
            {submitted ? (
              <p className="text-white font-medium">✓ Bedankt voor je aanmelding!</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto" aria-label="Nieuwsbrief aanmelding">
                <Input
                  type="email"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white w-full sm:w-64"
                  aria-label="E-mailadres voor nieuwsbrief"
                />
                <Button type="submit" className="bg-white text-brand-primary hover:bg-white/90 font-semibold shrink-0" nativeButton={false}>
                  Aanmelden
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)]">
          <motion.div className="flex flex-col gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
              <Image src={logo.src} alt={logo.alt} width={logo.width ?? 130} height={logo.height ?? 36} />
            </Link>
            {tagline && <p className="text-sm text-brand-text/70 max-w-xs leading-relaxed">{tagline}</p>}
            {socials && socials.length > 0 && (
              <div className="flex items-center gap-2">{socials.map(s => <SocialIcon key={s.platform} {...s} />)}</div>
            )}
          </motion.div>

          {columns.map((col, i) => (
            <motion.div key={col.heading} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={fadeUp}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-heading mb-4">{col.heading}</h3>
              <ul className="space-y-3" role="list">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-brand-text/70 hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {contact && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={columns.length + 1} variants={fadeUp}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-heading mb-4">Contact</h3>
              <address className="not-italic space-y-3">
                {contact.address && <p className="flex items-start gap-2 text-sm text-brand-text/70"><MdLocationOn size={16} className="mt-0.5 shrink-0 text-brand-primary" aria-hidden="true" />{contact.address}</p>}
                {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-brand-text/70 hover:text-brand-primary transition-colors"><MdPhone size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />{contact.phone}</a>}
                {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-brand-text/70 hover:text-brand-primary transition-colors"><MdEmail size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />{contact.email}</a>}
              </address>
            </motion.div>
          )}
        </div>

        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-text/50">{copyright}</p>
          <nav aria-label="Juridische links">
            <ul className="flex items-center gap-6 text-sm text-brand-text/50" role="list">
              <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-brand-primary transition-colors">Algemene voorwaarden</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
