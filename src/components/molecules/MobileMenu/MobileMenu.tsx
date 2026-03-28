'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from '@/components/atoms/NavLink'
import { NavButton } from '@/components/atoms/NavButton'
import type { NavItem, CTAConfig } from '@/types'

interface MobileMenuProps {
  isOpen: boolean
  items: NavItem[]
  cta?: CTAConfig
  currentPath?: string
  onClose: () => void
}

export function MobileMenu({ isOpen, items, cta, currentPath, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobiel navigatiemenu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="md:hidden border-t border-border bg-background"
        >
          <nav aria-label="Hoofdnavigatie mobiel">
            <ul
              className="flex flex-col px-4 py-5 gap-5"
              role="list"
            >
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    isActive={currentPath === item.href}
                    onClick={onClose}
                    className="text-base"
                  />
                </li>
              ))}
              {cta && (
                <li className="pt-1">
                  <NavButton
                    label={cta.label}
                    href={cta.href}
                    className="w-full justify-center"
                  />
                </li>
              )}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
