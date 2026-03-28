'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { StarRating } from '@/components/atoms/StarRating'
import { Skeleton } from '@/components/ui/skeleton'
import type { TestimonialsConfig, Testimonial } from '@/types'

export interface TestimonialsTwoColProps extends TestimonialsConfig {}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

interface FeaturedQuoteAuthorProps {
  testimonial: Testimonial
}

function FeaturedQuoteAuthor({ testimonial }: FeaturedQuoteAuthorProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const { authorName, authorRole, authorImage } = testimonial

  return (
    <div className="flex items-center gap-3 mt-auto">
      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
        {authorImage ? (
          <>
            {!imgLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
            <Image
              src={authorImage.src}
              alt={authorImage.alt}
              fill
              sizes="40px"
              className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-brand-primary/10">
            <span className="text-sm font-semibold text-brand-primary" aria-hidden="true">
              {authorName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-brand-heading">{authorName}</p>
        <p className="text-xs text-brand-text/60">{authorRole}</p>
      </div>
    </div>
  )
}

interface CompactCardProps {
  testimonial: Testimonial
  index: number
}

function CompactCard({ testimonial }: CompactCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      className="border-l-2 border-brand-primary/30 pl-4 py-1 flex flex-col gap-2"
    >
      <blockquote>
        <p className="text-sm text-brand-text/80 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <footer>
        <p className="text-xs font-semibold text-brand-heading">{testimonial.authorName}</p>
        <p className="text-xs text-brand-text/50">{testimonial.authorRole}</p>
      </footer>
    </motion.article>
  )
}

export function TestimonialsTwoCol({ sectionLabel, heading, subtext, testimonials }: TestimonialsTwoColProps) {
  const [featured, ...rest] = testimonials

  if (!featured) return null

  return (
    <section aria-labelledby="testimonials-heading" className="w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left column: section header + large display quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={containerVariants}
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants}>
              <SectionHeader label={sectionLabel} heading={heading} subtext={subtext} align="left" />
            </motion.div>

            <motion.article
              variants={itemVariants}
              className="flex flex-col gap-5 rounded-2xl bg-brand-primary/5 p-8"
              aria-label={`Uitgelichte review van ${featured.authorName}`}
            >
              {/* Decorative quote mark */}
              <span
                className="text-5xl leading-none text-brand-primary/20 font-heading select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {featured.rating && <StarRating rating={featured.rating} />}

              <blockquote>
                <p className="text-xl sm:text-2xl font-heading text-brand-heading leading-snug">{featured.quote}</p>
              </blockquote>

              <FeaturedQuoteAuthor testimonial={featured} />
            </motion.article>
          </motion.div>

          {/* Right column: compact cards */}
          {rest.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={containerVariants}
              className="flex flex-col gap-6"
              role="list"
              aria-label="Meer reviews"
            >
              {rest.map((t, i) => (
                <div key={t.authorName} role="listitem">
                  <CompactCard testimonial={t} index={i} />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
