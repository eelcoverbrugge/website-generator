'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { FooterColumn } from '@/components/molecules/FooterColumn'
import { FooterSocials } from '@/components/molecules/FooterSocials'
import { FooterContact } from '@/components/molecules/FooterContact'
import { FooterCopyright } from '@/components/molecules/FooterCopyright'
import type { FooterConfig } from '@/types'

export interface FooterDefaultProps extends FooterConfig {}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

export function FooterDefault({
  logo,
  tagline,
  columns,
  socials,
  contact,
  copyright,
}: FooterDefaultProps) {
  return (
    <footer role="contentinfo" className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="py-12 lg:py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(var(--col-count),1fr)]"
          style={{ '--col-count': columns.length + (contact ? 1 : 0) } as React.CSSProperties}
        >

          {/* Brand column */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={0}
            variants={fadeUp}
          >
            <Link
              href="/"
              aria-label={`${logo.alt} — naar de homepage`}
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 130}
                height={logo.height ?? 36}
                className="h-auto"
              />
            </Link>
            {tagline && (
              <p className="text-sm text-brand-text/70 max-w-xs leading-relaxed">
                {tagline}
              </p>
            )}
            {socials && socials.length > 0 && (
              <FooterSocials socials={socials} />
            )}
          </motion.div>

          {/* Navigation columns */}
          {columns.map((column, i) => (
            <motion.div
              key={column.heading}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i + 1}
              variants={fadeUp}
            >
              <FooterColumn heading={column.heading} links={column.links} />
            </motion.div>
          ))}

          {/* Contact column */}
          {contact && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={columns.length + 1}
              variants={fadeUp}
            >
              <FooterContact
                address={contact.address}
                phone={contact.phone}
                email={contact.email}
              />
            </motion.div>
          )}
        </div>

        {/* Copyright bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <FooterCopyright text={copyright} />
          <nav aria-label="Juridische links">
            <ul className="flex items-center gap-6 text-sm text-brand-text/50" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  Privacybeleid
                </Link>
              </li>
              <li>
                <Link
                  href="/voorwaarden"
                  className="hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  Algemene voorwaarden
                </Link>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  )
}
