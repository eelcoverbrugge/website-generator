'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/atoms/Logo'
import { NavButton } from '@/components/atoms/NavButton'
import { cn } from '@/lib/utils'
import type { NavbarDefaultProps } from './NavbarDefault'

export function NavbarMinimal({ logo, cta }: NavbarDefaultProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link href="/" aria-label={`${logo.alt} — naar de homepage`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
            <Logo {...logo} />
          </Link>
          {cta && <NavButton label={cta.label} href={cta.href} />}
        </div>
      </div>
    </header>
  )
}
