'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import { Skeleton } from '@/components/ui/skeleton'
import type { TeamConfig, TeamMember } from '@/types'

export interface TeamHorizontalProps extends TeamConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

interface HorizontalCardProps extends TeamMember {
  index: number
}

function HorizontalCard({ name, role, image, bio, socials, index }: HorizontalCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      {/* Image */}
      <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden shrink-0">
        {!imgLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 128px, 100vw"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 justify-center">
        <div>
          <h3 className="font-semibold text-lg text-brand-heading">{name}</h3>
          <p className="text-sm text-brand-primary font-medium">{role}</p>
        </div>
        {bio && <p className="text-sm text-brand-text/70 leading-relaxed">{bio}</p>}
        {socials && socials.length > 0 && (
          <div className="flex items-center gap-2 mt-1" aria-label={`Sociale media van ${name}`}>
            {socials.map((s) => (
              <SocialIcon key={s.platform} {...s} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function TeamHorizontal({ sectionLabel, heading, subtext, members }: TeamHorizontalProps) {
  return (
    <section aria-labelledby="team-heading" className="w-full bg-white py-16 sm:py-20 lg:py-28">
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

        <div role="list" className="flex flex-col gap-6">
          {members.map((member, i) => (
            <div key={member.name} role="listitem">
              <HorizontalCard {...member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
