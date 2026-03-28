'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { TestimonialCard } from '@/components/molecules/TestimonialCard'
import { StarRating } from '@/components/atoms/StarRating'
import { Skeleton } from '@/components/ui/skeleton'
import type { TestimonialsConfig } from '@/types'

export interface TestimonialsFeaturedProps extends TestimonialsConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const featuredVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface FeaturedAuthorProps {
  authorName: string
  authorRole: string
  authorImage?: { src: string; alt: string }
}

function FeaturedAuthor({ authorName, authorRole, authorImage }: FeaturedAuthorProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-brand-primary/10 shrink-0">
        {authorImage ? (
          <>
            {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-full" />}
            <Image
              src={authorImage.src}
              alt={authorImage.alt}
              fill
              sizes="64px"
              className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-brand-primary/10">
            <span className="text-lg font-semibold text-brand-primary" aria-hidden="true">
              {authorName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-base font-semibold text-brand-heading">{authorName}</p>
        <p className="text-sm text-brand-text/60">{authorRole}</p>
      </div>
    </div>
  )
}

export function TestimonialsFeatured({ sectionLabel, heading, subtext, testimonials }: TestimonialsFeaturedProps) {
  const [featured, ...rest] = testimonials

  if (!featured) return null

  return (
    <section aria-labelledby="testimonials-heading" className="w-full bg-white py-16 sm:py-20 lg:py-28">
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

        {/* Featured testimonial */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={featuredVariants}
          className="relative mb-12 rounded-3xl bg-brand-primary/5 p-8 sm:p-12 lg:p-16"
          aria-label={`Uitgelichte review van ${featured.authorName}`}
        >
          {/* Large decorative quote mark */}
          <span
            className="absolute top-6 left-8 text-8xl leading-none text-brand-primary/15 font-heading select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="relative flex flex-col gap-6 lg:gap-8">
            {featured.rating && <StarRating rating={featured.rating} />}

            <blockquote>
              <p className="text-xl sm:text-2xl lg:text-3xl font-heading text-brand-heading leading-snug">
                {featured.quote}
              </p>
            </blockquote>

            <FeaturedAuthor
              authorName={featured.authorName}
              authorRole={featured.authorRole}
              authorImage={featured.authorImage}
            />
          </div>
        </motion.article>

        {/* Remaining testimonials grid */}
        {rest.length > 0 && (
          <motion.div
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={gridVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {rest.map((t, i) => (
              <div key={t.authorName} role="listitem">
                <TestimonialCard {...t} index={i} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
