'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { BlogConfig, BlogPost } from '@/types'

export interface BlogListProps extends BlogConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

interface BlogListCardProps extends BlogPost {
  index: number
}

function BlogListCard({ title, excerpt, date, category, image, href, index }: BlogListCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group flex flex-col sm:flex-row rounded-2xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link
        href={href}
        className="contents focus-visible:outline-none"
        aria-label={`Lees meer: ${title}`}
      >
        {/* Image – ~30% width on sm+ */}
        <div className="relative aspect-[16/9] sm:aspect-auto sm:w-[30%] shrink-0 overflow-hidden">
          {!imgLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 30vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 flex-1">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs text-brand-primary bg-brand-primary/10 border-0">
              {category}
            </Badge>
            <time dateTime={date} className="text-xs text-brand-text/50">
              {date}
            </time>
          </div>
          <h3 className="font-semibold text-lg text-brand-heading group-hover:text-brand-primary transition-colors line-clamp-2">
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

export function BlogList({ sectionLabel, heading, subtext, posts, cta }: BlogListProps) {
  return (
    <section aria-labelledby="blog-heading" className="w-full bg-background py-16 sm:py-20 lg:py-28">
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

        <div role="list" className="flex flex-col gap-5 max-w-4xl mx-auto">
          {posts.map((post, i) => (
            <div key={post.href} role="listitem">
              <BlogListCard {...post} index={i} />
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
