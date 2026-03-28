'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Skeleton } from '@/components/ui/skeleton'
import type { TeamConfig, TeamMember } from '@/types'

export interface TeamMinimalProps extends TeamConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const memberVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

interface MinimalMemberProps extends TeamMember {
  index: number
}

function MinimalMember({ name, role, image, index }: MinimalMemberProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={memberVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col items-center gap-3 text-center"
    >
      {/* Circular photo */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0">
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="112px"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Name + role */}
      <div>
        <h3 className="font-semibold text-brand-heading">{name}</h3>
        <p className="text-sm text-brand-primary">{role}</p>
      </div>
    </motion.article>
  )
}

export function TeamMinimal({ sectionLabel, heading, subtext, members }: TeamMinimalProps) {
  return (
    <section aria-labelledby="team-heading" className="w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-14 lg:mb-20"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        <div
          role="list"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {members.map((member, i) => (
            <div key={member.name} role="listitem">
              <MinimalMember {...member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
