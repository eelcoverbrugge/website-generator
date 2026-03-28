'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import type { TeamMember } from '@/types'

interface TeamMemberCardProps extends TeamMember {
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

export function TeamMemberCard({ name, role, image, bio, socials, index }: TeamMemberCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col items-center text-center gap-4"
    >
      {/* Photo */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-brand-primary/10 shrink-0">
        {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-full" />}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="128px"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-brand-heading">{name}</h3>
        <p className="text-sm text-brand-primary font-medium">{role}</p>
        {bio && <p className="text-sm text-brand-text/70 leading-relaxed mt-1 max-w-xs">{bio}</p>}
      </div>

      {/* Socials */}
      {socials && socials.length > 0 && (
        <div className="flex items-center gap-2" aria-label={`Sociale media van ${name}`}>
          {socials.map((s) => (
            <SocialIcon key={s.platform} {...s} />
          ))}
        </div>
      )}
    </motion.article>
  )
}
