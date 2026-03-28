'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { TestimonialQuote } from '@/components/atoms/TestimonialQuote'
import { StarRating } from '@/components/atoms/StarRating'
import { Skeleton } from '@/components/ui/skeleton'
import type { Testimonial } from '@/types'

interface TestimonialCardProps extends Testimonial {
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

export function TestimonialCard({ quote, authorName, authorRole, authorImage, rating, index }: TestimonialCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm"
    >
      {rating && <StarRating rating={rating} />}
      <TestimonialQuote text={quote} />
      <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
        {authorImage && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            {!imgLoaded && <Skeleton className="absolute inset-0" />}
            <Image
              src={authorImage.src}
              alt={authorImage.alt}
              fill
              className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        )}
        {!authorImage && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 shrink-0">
            <span className="text-sm font-semibold text-brand-primary" aria-hidden="true">
              {authorName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-brand-heading">{authorName}</p>
          <p className="text-xs text-brand-text/60">{authorRole}</p>
        </div>
      </footer>
    </motion.article>
  )
}
