'use client'

import { motion, type Variants } from 'framer-motion'
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md'
import type { ContactInfo as ContactInfoType } from '@/types'

interface ContactInfoProps extends ContactInfoType {}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export function ContactInfo({ address, phone, email, openingHours }: ContactInfoProps) {
  const items = [
    { icon: MdLocationOn, label: 'Adres', value: address, href: undefined },
    { icon: MdPhone, label: 'Telefoon', value: phone, href: phone ? `tel:${phone.replace(/\s/g, '')}` : undefined },
    { icon: MdEmail, label: 'E-mail', value: email, href: email ? `mailto:${email}` : undefined },
    { icon: MdAccessTime, label: 'Openingstijden', value: openingHours, href: undefined },
  ].filter((item) => item.value)

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
    >
      {items.map(({ icon: Icon, label, value, href }) => (
        <motion.div key={label} variants={itemVariants} className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary/10 shrink-0">
            <Icon size={20} className="text-brand-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text/50 mb-0.5">{label}</p>
            {href ? (
              <a href={href} className="text-sm text-brand-text hover:text-brand-primary transition-colors">
                {value}
              </a>
            ) : (
              <p className="text-sm text-brand-text">{value}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
