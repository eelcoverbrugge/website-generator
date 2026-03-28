import { notFound } from 'next/navigation'

/**
 * Beveiligde wrapper: de builder is alleen bereikbaar als ENABLE_BUILDER=true
 * staat in .env.local. Op Vercel (preview én productie) is de variabele
 * niet aanwezig, waardoor deze route automatisch een 404 retourneert.
 */
export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  if (process.env.ENABLE_BUILDER !== 'true') {
    notFound()
  }
  return <>{children}</>
}
