'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { StarRating } from '@/components/atoms/StarRating'
import { Skeleton } from '@/components/ui/skeleton'
import type { TestimonialsConfig } from '@/types'

export interface TestimonialsCarouselProps extends TestimonialsConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

interface AuthorAvatarProps {
  authorName: string
  authorImage?: { src: string; alt: string }
}

function AuthorAvatar({ authorName, authorImage }: AuthorAvatarProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!authorImage) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 shrink-0">
        <span className="text-base font-semibold text-brand-primary" aria-hidden="true">
          {authorName.charAt(0)}
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
      {!imgLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
      <Image
        src={authorImage.src}
        alt={authorImage.alt}
        fill
        sizes="48px"
        className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  )
}

export function TestimonialsCarousel({ sectionLabel, heading, subtext, testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (testimonials.length === 0) return null

  const active = testimonials[activeIndex]

  const goPrev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const goNext = () => setActiveIndex((i) => (i + 1) % testimonials.length)

  return (
    <section aria-labelledby="testimonials-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
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

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Vorige review"
            className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-sm hover:bg-brand-primary/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Slide */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeIndex}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-background p-8 sm:p-10 text-center shadow-sm"
                aria-label={`Review ${activeIndex + 1} van ${testimonials.length}: ${active.authorName}`}
              >
                {active.rating && <StarRating rating={active.rating} />}

                <blockquote>
                  <p className="text-lg sm:text-xl text-brand-heading leading-relaxed max-w-2xl mx-auto">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </blockquote>

                <footer className="flex items-center gap-3">
                  <AuthorAvatar authorName={active.authorName} authorImage={active.authorImage} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-brand-heading">{active.authorName}</p>
                    <p className="text-xs text-brand-text/60">{active.authorRole}</p>
                  </div>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Volgende review"
            className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-sm hover:bg-brand-primary/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Reviews navigatie">
            {testimonials.map((t, i) => (
              <button
                key={t.authorName}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Ga naar review van ${t.authorName}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 bg-brand-primary'
                    : 'w-2 bg-brand-primary/25 hover:bg-brand-primary/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
