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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function HeroStacked({ badge, headline, subtext, primaryCTA, secondaryCTA, image }: HeroDefaultProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section aria-label="Hero" className="w-full bg-background overflow-hidden">

      {/* Full-width image */}
      <motion.div
        className="relative w-full aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7] overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          priority
        />
        {/* Bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      </motion.div>

      {/* Accent bar */}
      <div className="h-1.5 w-full bg-brand-primary" aria-hidden="true" />

      {/* Text section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {/* Left: badge + headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {badge && <HeroBadge text={badge} />}
            <HeroHeadline text={headline} className="lg:text-5xl xl:text-6xl" />
          </motion.div>

          {/* Right: subtext + CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:pb-2">
            <HeroSubtext text={subtext} />
            <div className="flex flex-wrap gap-4">
              <HeroCTAButton label={primaryCTA.label} href={primaryCTA.href} />
              {secondaryCTA && (
                <HeroSecondaryCTA label={secondaryCTA.label} href={secondaryCTA.href} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
