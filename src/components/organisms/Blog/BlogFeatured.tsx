'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { BlogCard } from '@/components/molecules/BlogCard'
import type { BlogConfig } from '@/types'

export interface BlogFeaturedProps extends BlogConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const featuredVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function FeaturedPost({ title, excerpt, date, category, image, href }: Omit<BlogConfig['posts'][number], never>) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      variants={featuredVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        aria-label={`Lees meer: ${title}`}
      >
        {/* Large image ~55% height */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
          {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs text-brand-primary bg-brand-primary/10 border-0">
              {category}
            </Badge>
            <time dateTime={date} className="text-xs text-brand-text/50">
              {date}
            </time>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-brand-heading group-hover:text-brand-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-brand-text/70 leading-relaxed line-clamp-3 max-w-2xl">
            {excerpt}
          </p>
          <span className="text-sm font-semibold text-brand-primary mt-2">
            Lees meer →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export function BlogFeatured({ sectionLabel, heading, subtext, posts, cta }: BlogFeaturedProps) {
  const [featured, ...rest] = posts

  return (
    <section aria-labelledby="blog-heading" className="w-full bg-muted/30 py-16 sm:py-20 lg:py-28">
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

        {/* Featured post */}
        {featured && (
          <div className="mb-8 lg:mb-10">
            <FeaturedPost {...featured} />
          </div>
        )}

        {/* Remaining posts in 2-column grid */}
        {rest.length > 0 && (
          <div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((post, i) => (
              <div key={post.href} role="listitem">
                <BlogCard {...post} index={i} />
              </div>
            ))}
          </div>
        )}

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
