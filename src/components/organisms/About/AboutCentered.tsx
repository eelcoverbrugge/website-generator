'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { AboutBody } from '@/components/atoms/AboutBody'
import { AboutStats } from '@/components/molecules/AboutStats'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { SectionImage } from '@/components/molecules/SectionImage'
import type { AboutDefaultProps } from './AboutDefault'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function AboutCentered({ sectionLabel, heading, body, stats, cta, image }: AboutDefaultProps) {
  return (
    <section aria-labelledby="about-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="flex flex-col items-center text-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {sectionLabel && <motion.div variants={itemVariants}><SectionLabel text={sectionLabel} /></motion.div>}
          <motion.div variants={itemVariants}><SectionHeading text={heading} /></motion.div>
          <motion.div variants={itemVariants}><AboutBody text={body} className="max-w-2xl" /></motion.div>
          {stats && stats.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 py-2">
              <AboutStats stats={stats} />
            </motion.div>
          )}
          {cta && <motion.div variants={itemVariants}><HeroCTAButton label={cta.label} href={cta.href} /></motion.div>}
        </motion.div>
      </div>
      {/* Full-width image below */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
        <SectionImage src={image.src} alt={image.alt} aspectRatio="16/9" slideFrom="right" />
      </div>
    </section>
  )
}
