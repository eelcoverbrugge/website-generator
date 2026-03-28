import client from '@/../client.config'
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
      // Logo, menu-items en CTA komen automatisch uit client.config
      logo:        client.logo,
      items:       client.nav.items,
      cta:         client.nav.cta,
      currentPath: '/',
    },
  },

  Hero: {
    label: 'Hero',
    variants: ['default', 'centered', 'stacked', 'bold'],
    defaultProps: {
      badge:        'Gratis adviesgesprek',
      headline:     'Meer klanten, minder gedoe',
      subtext:      'Wij bouwen websites die converteren. Snel, betaalbaar en op maat voor jouw bedrijf.',
      primaryCTA:   { label: 'Gratis offerte aanvragen', href: '/contact' },
      secondaryCTA: { label: 'Bekijk ons werk',          href: '/portfolio' },
      image:        { src: '/next.svg', alt: 'Hero afbeelding' },
    },
  },

  Footer: {
    label: 'Footer',
    variants: ['default', 'minimal', 'dark', 'newsletter'],
    defaultProps: {
      // Logo, contact en copyright komen automatisch uit client.config
      logo:      client.logo,
      tagline:   'Wij helpen MKB groeien met slimme digitale oplossingen.',
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
      contact:   client.contact,
      copyright: `© ${new Date().getFullYear()} ${client.name}. Alle rechten voorbehouden.`,
    },
  },
}
