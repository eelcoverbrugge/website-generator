// ─── Font keuzes ──────────────────────────────────────────────────────────────
// Bodytekst
export type FontBody    = 'inter' | 'source-sans' | 'lato'
// Koppen (h1–h6 via font-heading class)
export type FontHeading = 'playfair' | 'merriweather' | 'raleway'

// ─── Client config type ───────────────────────────────────────────────────────
export interface ClientConfig {
  /** Weergavenaam van het bedrijf (gebruikt in copyright, metadata, etc.) */
  name: string
  /** Domeinnaam zonder protocol, bijv. "bakkerijdewit.nl" */
  domain: string

  branding: {
    /** Primaire merkkleur — knoppen, links, actieve states */
    primary:    string
    /** Secundaire kleur — hover states, variaties */
    secondary:  string
    /** Accentkleur — badges, highlights, secundaire CTA's */
    accent:     string
    /** Kopkleur — h1, h2, h3 */
    heading:    string
    /** Bodytekst kleur */
    text:       string
    /** Lettertype voor bodytekst */
    fontBody:    FontBody
    /** Lettertype voor koppen */
    fontHeading: FontHeading
  }

  logo: {
    src:     string
    alt:     string
    width?:  number
    height?: number
  }

  contact: {
    address?:      string
    phone?:        string
    email?:        string
    openingHours?: string
  }

  seo: {
    /** Volledige paginatitel voor de homepage */
    title:       string
    /** Meta description (150–160 tekens) */
    description: string
    /** Pad naar OG-afbeelding in /public, bijv. "/og-image.jpg" */
    ogImage?:    string
  }

  nav: {
    /** Menu-items die in elke Navbar en MobileMenu verschijnen */
    items: Array<{ label: string; href: string }>
    /** CTA-knop rechtsboven in de navigatie */
    cta?:  { label: string; href: string }
  }
}
