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

export interface PortfolioCaseStudiesProps extends PortfolioConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

interface CaseStudyCardProps extends PortfolioItem {
  index: number
}

function CaseStudyCard({ title, category, image, href, index }: CaseStudyCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  // Odd items: image-left; even items: image-right
  const isReversed = index % 2 !== 0

  const imageBlock = (
    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden rounded-2xl w-full lg:w-[40%] shrink-0">
      {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 flex-1">
      <Badge variant="secondary" className="self-start text-xs text-brand-primary bg-brand-primary/10 border-0">
        {category}
      </Badge>

      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-bold text-xl sm:text-2xl text-brand-heading hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:underline"
        >
          {title}
        </Link>
      ) : (
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-heading">
          {title}
        </h3>
      )}

      <p className="text-brand-text/70 leading-relaxed">
        Bekijk dit project →
      </p>
    </div>
  )

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group flex flex-col lg:flex-row rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ flexDirection: isReversed ? undefined : undefined }}
    >
      {isReversed ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </motion.article>
  )
}

export function PortfolioCaseStudies({ sectionLabel, heading, subtext, items, cta }: PortfolioCaseStudiesProps) {
  return (
    <section aria-labelledby="portfolio-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
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

        <div role="list" className="flex flex-col gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div key={item.title} role="listitem">
              <CaseStudyCard {...item} index={i} />
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
