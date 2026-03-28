'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import type { BlogConfig, BlogPost } from '@/types'

export interface BlogMinimalProps extends BlogConfig {}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' as const },
  }),
}

interface BlogMinimalRowProps extends BlogPost {
  index: number
}

function BlogMinimalRow({ title, excerpt, date, category, href, index }: BlogMinimalRowProps) {
  return (
    <motion.article
      custom={index}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="group flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-6">
        {/* Date */}
        <time
          dateTime={date}
          className="shrink-0 font-mono text-sm text-brand-text/40 sm:w-32 sm:pt-0.5"
        >
          {date}
        </time>

        {/* Category badge */}
        <div className="shrink-0 sm:w-28">
          <Badge variant="secondary" className="text-xs text-brand-primary bg-brand-primary/10 border-0">
            {category}
          </Badge>
        </div>

        {/* Title + excerpt */}
        <div className="flex flex-col gap-1 flex-1">
          <Link
            href={href}
            className="font-semibold text-brand-heading group-hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {title}
          </Link>
          <p className="text-sm text-brand-text/60 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </div>
      <div className="h-px bg-border" role="separator" />
    </motion.article>
  )
}

export function BlogMinimal({ sectionLabel, heading, subtext, posts, cta }: BlogMinimalProps) {
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

        <div className="max-w-4xl mx-auto">
          {/* Top divider */}
          <div className="h-px bg-border mb-0" />

          <div role="list">
            {posts.map((post, i) => (
              <div key={post.href} role="listitem">
                <BlogMinimalRow {...post} index={i} />
              </div>
            ))}
          </div>
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
