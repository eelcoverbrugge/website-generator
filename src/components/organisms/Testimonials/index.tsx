import { TestimonialsDefault, type TestimonialsDefaultProps } from './TestimonialsDefault'
import { TestimonialsFeatured } from './TestimonialsFeatured'
import { TestimonialsCarousel } from './TestimonialsCarousel'
import { TestimonialsTwoCol } from './TestimonialsTwoCol'

export type TestimonialsVariant = 'default' | 'featured' | 'carousel' | 'two-col'
export interface TestimonialsProps extends TestimonialsDefaultProps {
  variant?: TestimonialsVariant
}

/**
 * Testimonials organism
 *
 * @example
 * <Testimonials
 *   variant="default"
 *   sectionLabel="Wat klanten zeggen"
 *   heading="Beoordeeld met een 9.2"
 *   testimonials={[
 *     { quote: 'Geweldige service!', authorName: 'Jan Bakker', authorRole: 'Eigenaar Bakkerij De Wit', rating: 5 },
 *   ]}
 * />
 */
export function Testimonials({ variant = 'default', ...props }: TestimonialsProps) {
  switch (variant) {
    case 'featured':
      return <TestimonialsFeatured {...props} />
    case 'carousel':
      return <TestimonialsCarousel {...props} />
    case 'two-col':
      return <TestimonialsTwoCol {...props} />
    case 'default':
    default:
      return <TestimonialsDefault {...props} />
  }
}
