'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { PortfolioConfig, PortfolioItem } from '@/types'

export interface PortfolioMasonryProps extends PortfolioConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

interface MasonryItemProps extends PortfolioItem {
  index: number
}

function MasonryItem({ title, category, image, href, index }: MasonryItemProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  // Alternate aspect ratios: landscape for even, portrait for odd
  const aspectClass = index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'

  const inner = (
    <div className={`group relative ${aspectClass} overflow-hidden rounded-2xl`}>
      {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
        <Badge className="self-start text-xs bg-brand-accent text-white border-0">{category}</Badge>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {/* Mobile always-visible label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent sm:hidden">
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
    </div>
  )

  return (
    <motion.article
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="break-inside-avoid mb-5"
    >
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Bekijk project: ${title}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.article>
  )
}

export function PortfolioMasonry({ sectionLabel, heading, subtext, items, cta }: PortfolioMasonryProps) {
  return (
    <section aria-labelledby="portfolio-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        {/* CSS columns masonry */}
        <div
          role="list"
          className="columns-2 lg:columns-3 gap-5"
        >
          {items.map((item, i) => (
            <div key={item.title} role="listitem">
              <MasonryItem {...item} index={i} />
            </div>
          ))}
        </div>

        {cta && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <HeroCTAButton label={cta.label} href={cta.href} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
