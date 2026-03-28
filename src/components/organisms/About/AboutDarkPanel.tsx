'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { AboutBody } from '@/components/atoms/AboutBody'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { AboutDefaultProps } from './AboutDefault'

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const rightVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function AboutDarkPanel({ sectionLabel, heading, body, stats, cta, image }: AboutDefaultProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section aria-labelledby="about-heading" className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left dark panel */}
        <motion.div
          className="bg-brand-heading relative min-h-[400px] lg:min-h-[600px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={leftVariants}
        >
          {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none bg-white/10" />}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn('object-cover transition-opacity duration-700', imgLoaded ? 'opacity-60' : 'opacity-0')}
            onLoad={() => setImgLoaded(true)}
          />
          {/* Stats overlay */}
          {stats && stats.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-brand-heading to-transparent">
              <dl className="flex flex-wrap gap-6">
                {stats.map(stat => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="font-heading text-3xl font-bold text-brand-primary">{stat.value}</dt>
                    <dd className="text-xs text-white/60">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>

        {/* Right white panel */}
        <motion.div
          className="flex flex-col justify-center gap-6 px-8 py-16 sm:px-12 lg:px-16 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={rightVariants}
        >
          {sectionLabel && <motion.div variants={itemVariants}><SectionLabel text={sectionLabel} /></motion.div>}
          <motion.div variants={itemVariants}><SectionHeading text={heading} /></motion.div>
          <motion.div variants={itemVariants}><AboutBody text={body} /></motion.div>
          {cta && <motion.div variants={itemVariants}><HeroCTAButton label={cta.label} href={cta.href} /></motion.div>}
        </motion.div>

      </div>
    </section>
  )
}
