'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import type { LogoStripDefaultProps } from './LogoStripDefault'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

function LogoItem({ src, alt, width = 120, height = 40 }: { src: string; alt: string; width?: number; height?: number }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div variants={itemVariants} className="relative flex items-center justify-center rounded-xl border border-border bg-background p-5 hover:border-brand-primary/30 hover:shadow-sm transition-all duration-200">
      {!loaded && <Skeleton className="absolute inset-0 rounded-xl" />}
      <Image src={src} alt={alt} width={width} height={height} className={`object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${loaded ? '' : 'opacity-0'}`} onLoad={() => setLoaded(true)} />
    </motion.div>
  )
}

export function LogoStripGrid({ label, logos }: LogoStripDefaultProps) {
  return (
    <section aria-label="Klanten en partners" className="w-full bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-center text-sm font-medium uppercase tracking-widest text-brand-text/50 mb-8">{label}</p>
        )}
        <motion.ul
          className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6"
          role="list"
          aria-label="Klantenlogos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {logos.map(logo => (
            <li key={logo.alt}>
              <LogoItem {...logo} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
