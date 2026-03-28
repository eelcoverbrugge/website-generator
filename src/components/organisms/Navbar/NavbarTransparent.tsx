'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/atoms/Logo'
import { NavButton } from '@/components/atoms/NavButton'
import { HamburgerButton } from '@/components/atoms/HamburgerButton'
import { NavMenu } from '@/components/molecules/NavMenu'
import { MobileMenu } from '@/components/molecules/MobileMenu'
import { cn } from '@/lib/utils'
import type { NavbarDefaultProps } from './NavbarDefault'

export function NavbarTransparent({ logo, items, cta, currentPath }: NavbarDefaultProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isOpaque = isScrolled || isMenuOpen

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400',
        isOpaque
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-md focus:text-sm">
        Ga naar hoofdinhoud
      </a>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" aria-label={`${logo.alt} — naar de homepage`} className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
            <Logo {...logo} className={cn('transition-all duration-300', !isOpaque && 'brightness-0 invert')} />
          </Link>

          <NavMenu items={items} currentPath={currentPath} />

          <div className="flex items-center gap-3">
            {cta && (
              <div className="hidden md:block">
                <NavButton
                  label={cta.label}
                  href={cta.href}
                  className={cn(!isOpaque && 'bg-white text-brand-primary hover:bg-white/90')}
                />
              </div>
            )}
            <div className="md:hidden">
              <HamburgerButton
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen(p => !p)}
                className={cn(!isOpaque && 'text-white hover:text-white hover:bg-white/20')}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} items={items} cta={cta} currentPath={currentPath} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
