'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ImageConfig } from '@/types'

interface SectionImageProps extends ImageConfig {
  slideFrom?: 'left' | 'right'
  className?: string
  aspectRatio?: 'square' | '4/3' | '3/2' | '16/9'
}

const aspectClasses = {
  'square': 'aspect-square',
  '4/3':    'aspect-[4/3]',
  '3/2':    'aspect-[3/2]',
  '16/9':   'aspect-video',
}

export function SectionImage({
  src,
  alt,
  slideFrom = 'right',
  className,
  aspectRatio = '4/3',
}: SectionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl',
        aspectClasses[aspectRatio],
        className
      )}
      initial={{ opacity: 0, x: slideFrom === 'right' ? 32 : -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          'object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  )
}
