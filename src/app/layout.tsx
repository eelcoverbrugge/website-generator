import type { Metadata } from 'next'
import {
  Inter,
  Source_Sans_3,
  Lato,
  Playfair_Display,
  Merriweather,
  Raleway,
} from 'next/font/google'
import './globals.css'
import client from '@/../client.config'

// ─── Beschikbare fonts ────────────────────────────────────────────────────────
// Stel in via client.config.ts — branding.fontBody en branding.fontHeading

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
})
const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
})
// ─────────────────────────────────────────────────────────────────────────────

// Map config-sleutels naar de CSS-variabele van het geladen font
const FONT_BODY_VAR: Record<string, string> = {
  'inter':       '--font-inter',
  'source-sans': '--font-source-sans',
  'lato':        '--font-lato',
}
const FONT_HEADING_VAR: Record<string, string> = {
  'playfair':     '--font-playfair',
  'merriweather': '--font-merriweather',
  'raleway':      '--font-raleway',
}

const bodyVar    = FONT_BODY_VAR[client.branding.fontBody]    ?? '--font-inter'
const headingVar = FONT_HEADING_VAR[client.branding.fontHeading] ?? '--font-playfair'

// ─── SEO-metadata uit client.config ──────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(`https://${client.domain}`),
  title: {
    template: `%s | ${client.name}`,
    default:  client.seo.title,
  },
  description: client.seo.description,
  openGraph: {
    title:       client.seo.title,
    description: client.seo.description,
    siteName:    client.name,
    locale:      'nl_NL',
    type:        'website',
    ...(client.seo.ogImage ? { images: [client.seo.ogImage] } : {}),
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={[
        inter.variable,
        sourceSans.variable,
        lato.variable,
        playfairDisplay.variable,
        merriweather.variable,
        raleway.variable,
        'h-full antialiased',
      ].join(' ')}
    >
      {/* Injecteer brand-kleuren en font-keuze als CSS custom properties.
          Waarden komen uit client.config.ts — verander ze daar, niet hier. */}
      <head>
        <style>{`
          :root {
            --brand-primary:   ${client.branding.primary};
            --brand-secondary: ${client.branding.secondary};
            --brand-accent:    ${client.branding.accent};
            --brand-heading:   ${client.branding.heading};
            --brand-text:      ${client.branding.text};
            --font-body:    var(${bodyVar});
            --font-display: var(${headingVar});
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
