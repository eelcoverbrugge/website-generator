'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ImageConfig } from '@/types'

interface HeroImageProps extends ImageConfig {
  className?: string
}

export function HeroImage({ src, alt, className }: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/2]',
        className
      )}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className={cn(
          'object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        priority
      />
    </motion.div>
  )
}
