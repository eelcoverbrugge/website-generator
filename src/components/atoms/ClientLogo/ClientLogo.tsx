'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import type { ClientLogoItem } from '@/types'

interface ClientLogoProps extends ClientLogoItem {}

export function ClientLogo({ src, alt, width = 120, height = 40 }: ClientLogoProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative flex items-center justify-center" style={{ width, height }}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-md" />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${loaded ? 'opacity-60' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
