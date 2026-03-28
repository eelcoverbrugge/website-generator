/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  CLIENT CONFIG — pas dit bestand aan per opdrachtgever          ║
 * ║  Dit is het enige bestand dat je per fork hoeft te wijzigen     ║
 * ║  voor branding, contactgegevens en SEO.                         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
import type { ClientConfig } from './src/lib/client/types'

const config: ClientConfig = {
  // ─── Bedrijfsinfo ────────────────────────────────────────────────
  name:   'Bedrijfsnaam',
  domain: 'bedrijf.nl',

  // ─── Branding ────────────────────────────────────────────────────
  // Kleuren: gebruik HEX, RGB of oklch. Tip: https://uicolors.app
  // Fonts: zie src/lib/client/types.ts voor de beschikbare keuzes
  branding: {
    primary:    '#2563eb',  // knoppen, links, actieve states
    secondary:  '#1e40af',  // hover states, variaties
    accent:     '#f59e0b',  // badges, highlights
    heading:    '#111827',  // h1, h2, h3
    text:       '#374151',  // bodytekst

    fontBody:    'inter',     // 'inter' | 'source-sans' | 'lato'
    fontHeading: 'playfair',  // 'playfair' | 'merriweather' | 'raleway'
  },

  // ─── Logo ────────────────────────────────────────────────────────
  // Plaats het logobestand in /public en pas het pad hieronder aan
  logo: {
    src:    '/logo.svg',
    alt:    'Bedrijfsnaam',
    width:  120,
    height: 36,
  },

  // ─── Contactgegevens ─────────────────────────────────────────────
  // Worden automatisch gebruikt in Footer, Contact-sectie en Navbar
  contact: {
    address:      'Voorbeeldstraat 1, 1234 AB Amsterdam',
    phone:        '020 123 4567',
    email:        'info@bedrijf.nl',
    openingHours: 'Ma–Vr: 9:00–17:00',
  },

  // ─── SEO ─────────────────────────────────────────────────────────
  seo: {
    title:       'Bedrijfsnaam — Slogan van het bedrijf',
    description: 'Korte omschrijving van het bedrijf voor Google (150–160 tekens).',
    ogImage:     '/og-image.jpg',  // 1200×630px aanbevolen
  },

  // ─── Navigatie ───────────────────────────────────────────────────
  // Menu-items en CTA-knop worden op elke pagina gebruikt
  nav: {
    items: [
      { label: 'Home',     href: '/' },
      { label: 'Diensten', href: '/diensten' },
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Contact',  href: '/contact' },
    ],
    cta: { label: 'Gratis offerte', href: '/contact' },
  },
}

export default config
