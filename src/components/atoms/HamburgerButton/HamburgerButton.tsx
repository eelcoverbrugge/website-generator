'use client'

import { HiMenu, HiX } from 'react-icons/hi'

interface HamburgerButtonProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function HamburgerButton({ isOpen, onToggle, className }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={`p-2 rounded-md text-brand-text hover:text-brand-primary hover:bg-brand-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${className ?? ''}`}
    >
      <span aria-hidden="true">
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </span>
    </button>
  )
}
