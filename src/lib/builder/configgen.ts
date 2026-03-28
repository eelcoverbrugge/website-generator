import type { ClientConfig } from '@/lib/client/types'

/**
 * Genereert de broncode van client.config.ts vanuit een ClientConfig object.
 * Gebruikt door de Instellingen-tab in de builder om het config-bestand
 * naar disk te schrijven.
 */
export function generateConfigCode(cfg: ClientConfig): string {
  const s = JSON.stringify

  const navItems = cfg.nav.items
    .map(item => `      { label: ${s(item.label)}, href: ${s(item.href)} }`)
    .join(',\n')

  const ctaBlock = cfg.nav.cta
    ? `    cta: { label: ${s(cfg.nav.cta.label)}, href: ${s(cfg.nav.cta.href)} },`
    : `    // cta: undefined,`

  const contactLines = [
    cfg.contact.address      ? `    address:      ${s(cfg.contact.address)},`      : null,
    cfg.contact.phone        ? `    phone:        ${s(cfg.contact.phone)},`        : null,
    cfg.contact.email        ? `    email:        ${s(cfg.contact.email)},`        : null,
    cfg.contact.openingHours ? `    openingHours: ${s(cfg.contact.openingHours)},` : null,
  ].filter(Boolean).join('\n')

  const ogImageLine = cfg.seo.ogImage
    ? `\n    ogImage:     ${s(cfg.seo.ogImage)},`
    : ''

  return `/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  CLIENT CONFIG — pas dit bestand aan per opdrachtgever          ║
 * ║  Dit is het enige bestand dat je per fork hoeft te wijzigen     ║
 * ║  voor branding, contactgegevens en SEO.                         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
import type { ClientConfig } from './src/lib/client/types'

const config: ClientConfig = {
  // ─── Bedrijfsinfo ────────────────────────────────────────────────
  name:   ${s(cfg.name)},
  domain: ${s(cfg.domain)},

  // ─── Branding ────────────────────────────────────────────────────
  // Kleuren: gebruik HEX, RGB of oklch. Tip: https://uicolors.app
  // Fonts: zie src/lib/client/types.ts voor de beschikbare keuzes
  branding: {
    primary:    ${s(cfg.branding.primary)},
    secondary:  ${s(cfg.branding.secondary)},
    accent:     ${s(cfg.branding.accent)},
    heading:    ${s(cfg.branding.heading)},
    text:       ${s(cfg.branding.text)},

    fontBody:    ${s(cfg.branding.fontBody)},
    fontHeading: ${s(cfg.branding.fontHeading)},
  },

  // ─── Logo ────────────────────────────────────────────────────────
  // Plaats het logobestand in /public en pas het pad hieronder aan
  logo: {
    src:    ${s(cfg.logo.src)},
    alt:    ${s(cfg.logo.alt)},
    width:  ${cfg.logo.width ?? 120},
    height: ${cfg.logo.height ?? 36},
  },

  // ─── Contactgegevens ─────────────────────────────────────────────
  // Worden automatisch gebruikt in Footer, Contact-sectie en Navbar
  contact: {
${contactLines}
  },

  // ─── SEO ─────────────────────────────────────────────────────────
  seo: {
    title:       ${s(cfg.seo.title)},
    description: ${s(cfg.seo.description)},${ogImageLine}
  },

  // ─── Navigatie ───────────────────────────────────────────────────
  // Menu-items en CTA-knop worden op elke pagina gebruikt
  nav: {
    items: [
${navItems},
    ],
${ctaBlock}
  },
}

export default config
`
}
