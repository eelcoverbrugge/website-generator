'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { HeroBadge } from '@/components/atoms/HeroBadge'
import { HeroHeadline } from '@/components/atoms/HeroHeadline'
import { HeroSubtext } from '@/components/atoms/HeroSubtext'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { Skeleton } from '@/components/ui/skeleton'
import type { HeroDefaultProps } from './HeroDefault'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function HeroCentered({ badge, headline, subtext, primaryCTA, secondaryCTA, image }: HeroDefaultProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-brand-heading"
    >
      {/* Background image */}
      {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-35' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
        priority
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {badge && (
            <motion.div variants={itemVariants}>
              <HeroBadge
                text={badge}
                className="border-white/30 bg-white/10 text-white"
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <HeroHeadline
              text={headline}
              className="text-white sm:text-6xl lg:text-7xl"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroSubtext
              text={subtext}
              className="text-white/75 max-w-xl mx-auto"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-2">
            <HeroCTAButton
              label={primaryCTA.label}
              href={primaryCTA.href}
              className="bg-white text-brand-heading hover:bg-white/90 focus-visible:ring-white"
            />
            {secondaryCTA && (
              <HeroSecondaryCTA
                label={secondaryCTA.label}
                href={secondaryCTA.href}
                className="border-white/40 text-white hover:border-white hover:bg-white/10 hover:text-white"
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
