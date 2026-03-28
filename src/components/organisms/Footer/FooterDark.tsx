'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'
import type { FooterDefaultProps } from './FooterDefault'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const } }),
}

export function FooterDark({ logo, tagline, columns, socials, contact, copyright }: FooterDefaultProps) {
  return (
    <footer role="contentinfo" className="bg-brand-heading text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)]">

          {/* Brand */}
          <motion.div className="flex flex-col gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <Link href="/" aria-label={`${logo.alt} — homepage`} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
              <Image src={logo.src} alt={logo.alt} width={logo.width ?? 130} height={logo.height ?? 36} className="brightness-0 invert" />
            </Link>
            {tagline && <p className="text-sm text-white/60 max-w-xs leading-relaxed">{tagline}</p>}
            {socials && socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map(s => (
                  <SocialIcon key={s.platform} {...s} className="text-white/60 bg-white/10 hover:text-white hover:bg-white/20" />
                ))}
              </div>
            )}
          </motion.div>

          {/* Columns */}
          {columns.map((col, i) => (
            <motion.div key={col.heading} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={fadeUp}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">{col.heading}</h3>
              <ul className="space-y-3" role="list">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          {contact && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={columns.length + 1} variants={fadeUp}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</h3>
              <address className="not-italic space-y-3">
                {contact.address && <p className="flex items-start gap-2 text-sm text-white/60"><MdLocationOn size={16} className="mt-0.5 shrink-0 text-brand-primary" aria-hidden="true" />{contact.address}</p>}
                {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><MdPhone size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />{contact.phone}</a>}
                {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><MdEmail size={16} className="shrink-0 text-brand-primary" aria-hidden="true" />{contact.email}</a>}
              </address>
            </motion.div>
          )}
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{copyright}</p>
          <nav aria-label="Juridische links">
            <ul className="flex items-center gap-5 text-xs text-white/40" role="list">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-white transition-colors">Algemene voorwaarden</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
