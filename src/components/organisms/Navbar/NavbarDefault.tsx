'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/atoms/Logo'
import { NavButton } from '@/components/atoms/NavButton'
import { HamburgerButton } from '@/components/atoms/HamburgerButton'
import { NavMenu } from '@/components/molecules/NavMenu'
import { MobileMenu } from '@/components/molecules/MobileMenu'
import { cn } from '@/lib/utils'
import type { NavItem, LogoConfig, CTAConfig } from '@/types'

export interface NavbarDefaultProps {
  logo: LogoConfig
  items: NavItem[]
  cta?: CTAConfig
  currentPath?: string
}

export function NavbarDefault({ logo, items, cta, currentPath }: NavbarDefaultProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-background'
      )}
    >
      {/* Skip to main content — accessible keyboard shortcut */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Ga naar hoofdinhoud
      </a>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            aria-label={`${logo.alt} — naar de homepage`}
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            <Logo {...logo} />
          </Link>

          {/* Desktop nav (hidden on mobile) */}
          <NavMenu items={items} currentPath={currentPath} />

          {/* Right side: CTA button + hamburger */}
          <div className="flex items-center gap-3">
            {cta && (
              <div className="hidden md:block">
                <NavButton label={cta.label} href={cta.href} />
              </div>
            )}
            <div className="md:hidden">
              <HamburgerButton
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen((prev) => !prev)}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        items={items}
        cta={cta}
        currentPath={currentPath}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  )
}
