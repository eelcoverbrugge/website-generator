import { SocialIcon } from '@/components/atoms/SocialIcon'
import type { SocialLink } from '@/types'

interface FooterSocialsProps {
  socials: SocialLink[]
}

export function FooterSocials({ socials }: FooterSocialsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Sociale media">
      {socials.map((social) => (
        <SocialIcon key={social.platform} {...social} />
      ))}
    </div>
  )
}
