'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { TeamMemberCard } from '@/components/molecules/TeamMemberCard'
import type { TeamConfig } from '@/types'

export interface TeamDefaultProps extends TeamConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function TeamDefault({ sectionLabel, heading, subtext, members }: TeamDefaultProps) {
  return (
    <section aria-labelledby="team-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div role="list" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, i) => (
            <div key={member.name} role="listitem">
              <TeamMemberCard {...member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
