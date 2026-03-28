'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { BlogPost } from '@/types'

interface BlogCardProps extends BlogPost {
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

export function BlogCard({ title, excerpt, date, category, image, href, index }: BlogCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="text-xs text-brand-primary bg-brand-primary/10 border-0">
              {category}
            </Badge>
            <time dateTime={date} className="text-xs text-brand-text/50">
              {date}
            </time>
          </div>
          <h3 className="font-semibold text-brand-heading group-hover:text-brand-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-brand-text/70 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <span className="text-sm font-medium text-brand-primary mt-1">
            Lees meer →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
