'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { MdOpenInNew } from 'react-icons/md'
import type { PortfolioItem } from '@/types'

interface PortfolioCardProps extends PortfolioItem {
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

export function PortfolioCard({ title, category, image, href, index }: PortfolioCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const inner = (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
      {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 gap-2">
        <Badge className="self-start text-xs bg-brand-accent text-white border-0">{category}</Badge>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          {href && <MdOpenInNew size={18} className="text-white shrink-0" aria-hidden="true" />}
        </div>
      </div>
      {/* Always-visible info on mobile (no hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent sm:hidden">
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
    </div>
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
