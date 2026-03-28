'use client'

import { Navbar, type NavbarProps } from '@/components/organisms/Navbar'
import { Hero,   type HeroProps   } from '@/components/organisms/Hero'
import { Footer, type FooterProps } from '@/components/organisms/Footer'
import type { SectionConfig } from '@/lib/builder/types'

interface Props {
  sections: SectionConfig[]
}

export function PreviewPanel({ sections }: Props) {
  if (sections.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-brand-text/30 text-sm">
        Geen secties toegevoegd
      </div>
    )
  }

  return (
    <div className="min-h-full flex flex-col">
      {sections.map(section => {
        switch (section.type) {
          case 'Navbar':
            return (
              <Navbar
                key={section.id}
                variant={section.variant as NavbarProps['variant']}
                {...(section.props as Omit<NavbarProps, 'variant'>)}
              />
            )
          case 'Hero':
            return (
              <Hero
                key={section.id}
                variant={section.variant as HeroProps['variant']}
                {...(section.props as Omit<HeroProps, 'variant'>)}
              />
            )
          case 'Footer':
            return (
              <Footer
                key={section.id}
                variant={section.variant as FooterProps['variant']}
                {...(section.props as Omit<FooterProps, 'variant'>)}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
