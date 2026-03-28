import { HeroContent } from '@/components/molecules/HeroContent'
import { HeroImage } from '@/components/molecules/HeroImage'
import type { HeroConfig } from '@/types'

export interface HeroDefaultProps extends HeroConfig {}

export function HeroDefault({
  badge,
  headline,
  subtext,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroDefaultProps) {
  return (
    <section
      aria-label="Hero"
      className="w-full bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left: text content */}
          <HeroContent
            badge={badge}
            headline={headline}
            subtext={subtext}
            primaryCTA={primaryCTA}
            secondaryCTA={secondaryCTA}
          />

          {/* Right: image */}
          <HeroImage
            src={image.src}
            alt={image.alt}
          />

        </div>
      </div>
    </section>
  )
}
