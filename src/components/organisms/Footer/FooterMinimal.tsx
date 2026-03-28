import Link from 'next/link'
import Image from 'next/image'
import { SocialIcon } from '@/components/atoms/SocialIcon'
import type { FooterDefaultProps } from './FooterDefault'

export function FooterMinimal({ logo, columns, socials, copyright }: FooterDefaultProps) {
  const allLinks = columns.flatMap(col => col.links)

  return (
    <footer role="contentinfo" className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <Link href="/" aria-label={`${logo.alt} — naar de homepage`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
            <Image src={logo.src} alt={logo.alt} width={logo.width ?? 100} height={logo.height ?? 32} />
          </Link>

          {/* Links */}
          <nav aria-label="Footer navigatie">
            <ul className="flex flex-wrap items-center gap-4" role="list">
              {allLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-text/60 hover:text-brand-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: socials + copyright */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            {socials && socials.length > 0 && (
              <div className="flex items-center gap-1.5">
                {socials.map(s => <SocialIcon key={s.platform} {...s} />)}
              </div>
            )}
            <p className="text-xs text-brand-text/50">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
