import { HeroCTAButton } from '@/components/atoms/HeroCTAButton'
import { HeroSecondaryCTA } from '@/components/atoms/HeroSecondaryCTA'
import type { CTAConfig } from '@/types'

interface HeroCTAGroupProps {
  primary: CTAConfig
  secondary?: CTAConfig
}

export function HeroCTAGroup({ primary, secondary }: HeroCTAGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <HeroCTAButton label={primary.label} href={primary.href} />
      {secondary && (
        <HeroSecondaryCTA label={secondary.label} href={secondary.href} />
      )}
    </div>
  )
}
