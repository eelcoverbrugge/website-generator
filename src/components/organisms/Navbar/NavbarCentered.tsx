'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '@/components/atoms/Logo'
import { NavLink } from '@/components/atoms/NavLink'
import { NavButton } from '@/components/atoms/NavButton'
import { HamburgerButton } from '@/components/atoms/HamburgerButton'
import { MobileMenu } from '@/components/molecules/MobileMenu'
import { cn } from '@/lib/utils'
import type { NavbarDefaultProps } from './NavbarDefault'

export function NavbarCentered({ logo, items, cta, currentPath }: NavbarDefaultProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-background',
        isScrolled && 'shadow-sm border-b border-border/50'
      )}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-md focus:text-sm">
        Ga naar hoofdinhoud
      </a>

      {/* Top row: logo center, CTA right, hamburger right on mobile */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Spacer left (desktop only) */}
          <div className="hidden md:flex items-center w-32" />

          {/* Logo centered */}
          <Link href="/" aria-label={`${logo.alt} — naar de homepage`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
            <Logo {...logo} />
          </Link>

          {/* Right side */}
          <div className="flex items-center justify-end gap-3 w-32">
            {cta && <div className="hidden md:block"><NavButton label={cta.label} href={cta.href} /></div>}
            <div className="md:hidden">
              <HamburgerButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(p => !p)} />
            </div>
          </div>
        </div>
      </div>

      {/* Second row: nav links (desktop only) */}
      <nav aria-label="Hoofdnavigatie desktop" className="hidden md:block border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 h-11" role="list">
            {items.map(item => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} isActive={currentPath === item.href} />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} items={items} cta={cta} currentPath={currentPath} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
