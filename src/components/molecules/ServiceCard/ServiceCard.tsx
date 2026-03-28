'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { FeatureIcon } from '@/components/atoms/FeatureIcon'
import { FeatureTitle } from '@/components/atoms/FeatureTitle'
import { FeatureDescription } from '@/components/atoms/FeatureDescription'
import { cn } from '@/lib/utils'
import type { Service } from '@/types'

interface ServiceCardProps extends Service {
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

export function ServiceCard({ icon, title, description, href, index }: ServiceCardProps) {
  const content = (
    <div className="flex flex-col gap-4 h-full">
      {icon && <FeatureIcon icon={icon} />}
      <div className="flex flex-col gap-2 flex-1">
        <FeatureTitle text={title} />
        <FeatureDescription text={description} />
      </div>
      {href && (
        <span className="text-sm font-medium text-brand-primary group-hover:underline">
          Meer lezen →
        </span>
      )}
    </div>
  )

  const classes = cn(
    'group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-primary/30 h-full'
  )

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {href ? (
        <Link href={href} className={classes}>
          {content}
        </Link>
      ) : (
        <div className={classes}>{content}</div>
      )}
    </motion.article>
  )
}
