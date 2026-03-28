'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import type { LogoStripDefaultProps } from './LogoStripDefault'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function LogoStripDark({ label, logos }: LogoStripDefaultProps) {
  return (
    <section aria-label="Klanten en partners" className="w-full bg-brand-heading py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="flex flex-col items-center gap-8"
        >
          {label && <p className="text-sm font-medium uppercase tracking-widest text-white/40">{label}</p>}
          <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16" role="list" aria-label="Klantenlogos">
            {logos.map(logo => (
              <li key={logo.alt}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 120}
                  height={logo.height ?? 40}
                  className="object-contain brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
