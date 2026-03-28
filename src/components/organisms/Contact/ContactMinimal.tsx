'use client'

import { motion, type Variants } from 'framer-motion'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { ContactConfig } from '@/types'

export interface ContactMinimalProps extends ContactConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

export function ContactMinimal({ sectionLabel, heading, subtext, info }: ContactMinimalProps) {
  const tiles = [
    {
      icon: MdPhone,
      label: 'Telefoon',
      value: info?.phone ?? '020 123 4567',
      href: info?.phone ? `tel:${info.phone.replace(/\s/g, '')}` : `tel:0201234567`,
    },
    {
      icon: MdEmail,
      label: 'E-mail',
      value: info?.email ?? 'info@bedrijf.nl',
      href: info?.email ? `mailto:${info.email}` : 'mailto:info@bedrijf.nl',
    },
    {
      icon: MdLocationOn,
      label: 'Adres',
      value: info?.address ?? 'Voorbeeldstraat 1, Amsterdam',
      href: undefined,
    },
  ]

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {tiles.map(({ icon: Icon, label, value, href }, i) => {
            const inner = (
              <div className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary/10">
                  <Icon size={28} className="text-brand-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-text/50">
                    {label}
                  </p>
                  <p className="font-medium text-brand-heading leading-snug">{value}</p>
                </div>
              </div>
            )

            return (
              <motion.div
                key={label}
                custom={i}
                variants={tileVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {href ? (
                  <a
                    href={href}
                    className="block rounded-2xl border border-border bg-background hover:border-brand-primary hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    aria-label={`${label}: ${value}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="rounded-2xl border border-border bg-background">
                    {inner}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
