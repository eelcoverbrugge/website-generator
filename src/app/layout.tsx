import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// ─── Lettertypen — verander per klant ────────────────────────────────────────
// Vervang 'Inter' en 'Playfair_Display' door andere Google Fonts naar keuze.
// Zie: https://fonts.google.com
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: '%s | Bedrijfsnaam',
    default: 'Bedrijfsnaam',
  },
  description: 'Beschrijving van het bedrijf voor SEO.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  )
}
