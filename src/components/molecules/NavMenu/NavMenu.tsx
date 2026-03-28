import { NavLink } from '@/components/atoms/NavLink'
import type { NavItem } from '@/types'

interface NavMenuProps {
  items: NavItem[]
  currentPath?: string
}

export function NavMenu({ items, currentPath }: NavMenuProps) {
  return (
    <nav aria-label="Hoofdnavigatie desktop">
      <ul
        className="hidden md:flex items-center gap-8"
        role="list"
      >
        {items.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              isActive={currentPath === item.href}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
