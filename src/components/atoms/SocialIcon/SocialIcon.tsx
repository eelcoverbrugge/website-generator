import Link from 'next/link'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import type { SocialLink } from '@/types'

const iconMap = {
  facebook:  FaFacebook,
  instagram: FaInstagram,
  linkedin:  FaLinkedin,
  twitter:   FaXTwitter,
  youtube:   FaYoutube,
  tiktok:    FaTiktok,
} as const

interface SocialIconProps extends SocialLink {
  className?: string
}

export function SocialIcon({ platform, href, ariaLabel, className }: SocialIconProps) {
  const Icon = iconMap[platform]

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-full text-brand-text/60 bg-brand-text/5 hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        className
      )}
    >
      <Icon size={16} aria-hidden="true" />
    </Link>
  )
}
