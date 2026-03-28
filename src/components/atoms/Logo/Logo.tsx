import Image from 'next/image'
import type { LogoConfig } from '@/types'

interface LogoProps extends LogoConfig {
  className?: string
}

export function Logo({ src, alt, width = 140, height = 40, className }: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
