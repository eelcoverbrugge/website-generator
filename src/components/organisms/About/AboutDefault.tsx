import { AboutContent } from '@/components/molecules/AboutContent'
import { SectionImage } from '@/components/molecules/SectionImage'
import { cn } from '@/lib/utils'
import type { AboutConfig } from '@/types'

export interface AboutDefaultProps extends AboutConfig {}

export function AboutDefault({
  sectionLabel,
  heading,
  body,
  stats,
  cta,
  image,
  imagePosition = 'right',
}: AboutDefaultProps) {
  const imageOnRight = imagePosition === 'right'

  return (
    <section
      aria-labelledby="about-heading"
      className="w-full bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center',
          )}
        >
          {/* Content — always first in DOM for SEO, reordered visually on lg */}
          <div className={cn(imageOnRight ? 'lg:order-1' : 'lg:order-2')}>
            <AboutContent
              sectionLabel={sectionLabel}
              heading={heading}
              body={body}
              stats={stats}
              cta={cta}
            />
          </div>

          {/* Image */}
          <div className={cn(imageOnRight ? 'lg:order-2' : 'lg:order-1')}>
            <SectionImage
              src={image.src}
              alt={image.alt}
              slideFrom={imageOnRight ? 'right' : 'left'}
              aspectRatio="4/3"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
