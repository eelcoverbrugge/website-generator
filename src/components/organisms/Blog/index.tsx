import { BlogDefault, type BlogDefaultProps } from './BlogDefault'
import { BlogFeatured } from './BlogFeatured'
import { BlogList } from './BlogList'
import { BlogMinimal } from './BlogMinimal'

export type BlogVariant = 'default' | 'featured' | 'list' | 'minimal'
export interface BlogProps extends BlogDefaultProps {
  variant?: BlogVariant
}

/**
 * Blog organism
 *
 * @example
 * <Blog
 *   variant="default"
 *   sectionLabel="Blog"
 *   heading="Laatste nieuws"
 *   posts={[
 *     { title: 'Waarom een snelle website meer klanten oplevert', excerpt: '...', date: '12 maart 2025', category: 'SEO', image: { src: '/blog/post-1.jpg', alt: '...' }, href: '/blog/snelle-website' },
 *   ]}
 *   cta={{ label: 'Alle artikelen', href: '/blog' }}
 * />
 */
export function Blog({ variant = 'default', ...props }: BlogProps) {
  switch (variant) {
    case 'featured':
      return <BlogFeatured {...props} />
    case 'list':
      return <BlogList {...props} />
    case 'minimal':
      return <BlogMinimal {...props} />
    case 'default':
    default:
      return <BlogDefault {...props} />
  }
}
