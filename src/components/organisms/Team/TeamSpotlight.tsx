'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { TeamMemberCard } from '@/components/molecules/TeamMemberCard'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import { Skeleton } from '@/components/ui/skeleton'
import type { TeamConfig, TeamMember } from '@/types'

export interface TeamSpotlightProps extends TeamConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const spotlightVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface SpotlightMemberProps {
  member: TeamMember
}

function SpotlightMember({ member }: SpotlightMemberProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const { name, role, image, bio, socials } = member

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={spotlightVariants}
      className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-border shadow-sm"
      aria-label={`Uitgelicht teamlid: ${name}`}
    >
      {/* Image — ~40% width on desktop */}
      <div className="relative h-64 lg:h-auto lg:col-span-2">
        {!imgLoaded && <Skeleton className="absolute inset-0" />}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Text — ~60% width on desktop */}
      <div className="lg:col-span-3 flex flex-col justify-center gap-4 bg-white p-8 sm:p-10 lg:p-12">
        <div>
          <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-brand-heading">{name}</h3>
          <p className="text-brand-primary font-medium mt-1">{role}</p>
        </div>

        {bio && (
          <p className="text-brand-text/70 leading-relaxed">{bio}</p>
        )}

        {socials && socials.length > 0 && (
          <div className="flex items-center gap-2 mt-2" aria-label={`Sociale media van ${name}`}>
            {socials.map((s) => (
              <SocialIcon key={s.platform} {...s} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function TeamSpotlight({ sectionLabel, heading, subtext, members }: TeamSpotlightProps) {
  const [spotlight, ...rest] = members

  if (!spotlight) return null

  return (
    <section aria-labelledby="team-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={headerVariants}
          className="mb-12 lg:mb-16"
        >
          <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="center" />
        </motion.div>

        {/* Spotlight member */}
        <div className="mb-12 lg:mb-16">
          <SpotlightMember member={spotlight} />
        </div>

        {/* Remaining members grid */}
        {rest.length > 0 && (
          <motion.div
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={gridVariants}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((member, i) => (
              <div key={member.name} role="listitem">
                <TeamMemberCard {...member} index={i} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
