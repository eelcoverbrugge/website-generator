'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { HeroBadge } from '@/components/atoms/HeroBadge'
import { HeroSubtext } from '@/components/atoms/HeroSubtext'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import { Skeleton } from '@/components/ui/skeleton'
import type { HeroDefaultProps } from './HeroDefault'

const leftVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export function HeroBold({ badge, headline, subtext, primaryCTA, secondaryCTA, image }: HeroDefaultProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section aria-label="Hero" className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-[80vh]">

        {/* Left — brand-primary panel */}
        <motion.div
          className="bg-brand-primary flex flex-col justify-center gap-6 px-8 py-16 sm:px-12 lg:px-16 xl:px-20"
          initial="hidden"
          animate="visible"
          variants={leftVariants}
        >
          {badge && (
            <motion.div variants={itemVariants}>
              <HeroBadge
                text={badge}
                className="border-white/30 bg-white/15 text-white"
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <h1 className="font-heading font-black text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              {headline}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroSubtext
              text={subtext}
              className="text-white/75 max-w-md"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <HeroCTAButton
              label={primaryCTA.label}
              href={primaryCTA.href}
              className="bg-white text-brand-primary hover:bg-white/90 focus-visible:ring-white shadow-none"
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

        {/* Right — full-bleed image, no border/radius */}
        <motion.div
          className="relative min-h-[320px] lg:min-h-0"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={`object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            priority
          />
        </motion.div>

      </div>
    </section>
  )
}
