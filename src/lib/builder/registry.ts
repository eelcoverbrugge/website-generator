import type { SectionType } from './types'

export interface SectionMeta {
  label: string
  variants: string[]
  defaultProps: Record<string, unknown>
}

export const REGISTRY: Record<SectionType, SectionMeta> = {
  Navbar: {
    label: 'Navigatie',
    variants: ['default', 'centered', 'transparent', 'minimal'],
    defaultProps: {
      logo: { src: '/next.svg', alt: 'Bedrijfsnaam', width: 120, height: 36 },
      items: [
        { label: 'Home',     href: '/' },
        { label: 'Diensten', href: '/diensten' },
        { label: 'Contact',  href: '/contact' },
      ],
      cta: { label: 'Gratis offerte', href: '/contact' },
      currentPath: '/',
    },
  },

  Hero: {
    label: 'Hero',
    variants: ['default', 'centered', 'stacked', 'bold'],
    defaultProps: {
      badge: 'Gratis adviesgesprek',
      headline: 'Meer klanten, minder gedoe',
      subtext: 'Wij bouwen websites die converteren. Snel, betaalbaar en op maat voor jouw bedrijf.',
      primaryCTA:   { label: 'Gratis offerte aanvragen', href: '/contact' },
      secondaryCTA: { label: 'Bekijk ons werk',          href: '/portfolio' },
      image: { src: '/next.svg', alt: 'Hero afbeelding' },
    },
  },

  Footer: {
    label: 'Footer',
    variants: ['default', 'minimal', 'dark', 'newsletter'],
    defaultProps: {
      logo: { src: '/next.svg', alt: 'Bedrijfsnaam', width: 120, height: 36 },
      tagline: 'Wij helpen MKB groeien met slimme digitale oplossingen.',
      columns: [
        {
          heading: 'Diensten',
          links: [
            { label: 'Webdesign', href: '/diensten/webdesign' },
            { label: 'SEO',       href: '/diensten/seo' },
          ],
        },
        {
          heading: 'Bedrijf',
          links: [
            { label: 'Over ons', href: '/over-ons' },
            { label: 'Contact',  href: '/contact' },
          ],
        },
      ],
      contact: {
        address: 'Voorbeeldstraat 1, 1234 AB Amsterdam',
        phone:   '020 123 4567',
        email:   'info@bedrijf.nl',
      },
      copyright: `© ${new Date().getFullYear()} Bedrijfsnaam. Alle rechten voorbehouden.`,
    },
  },
}
