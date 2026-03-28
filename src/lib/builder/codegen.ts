import type { PageConfig, SectionConfig, SectionType } from './types'

// ─── Props die in de gegenereerde code naar client.config verwijzen ───────────
// Als je het telefoonnummer in client.config aanpast, updaten alle gegenereerde
// pagina's automatisch — zonder dat je ze opnieuw hoeft te genereren.
const CLIENT_REFS: Partial<Record<SectionType, Record<string, string>>> = {
  Navbar: {
    logo:  'client.logo',
    items: 'client.nav.items',
    cta:   'client.nav.cta',
  },
  Footer: {
    logo:      'client.logo',
    contact:   'client.contact',
    copyright: '`© ${new Date().getFullYear()} ${client.name}. Alle rechten voorbehouden.`',
  },
}

// ─── Serialiseer een JS-waarde naar geldige JSX-code ─────────────────────────
function valueToCode(val: unknown, depth = 0): string {
  const pad      = '  '.repeat(depth)
  const padInner = '  '.repeat(depth + 1)

  if (val === null || val === undefined) return 'undefined'
  if (typeof val === 'boolean') return String(val)
  if (typeof val === 'number')  return String(val)
  if (typeof val === 'string')  return JSON.stringify(val)

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]'
    const items = val.map(v => `${padInner}${valueToCode(v, depth + 1)}`).join(',\n')
    return `[\n${items},\n${pad}]`
  }

  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => `${padInner}${k}: ${valueToCode(v, depth + 1)}`)
      .join(',\n')
    return `{\n${entries},\n${pad}}`
  }

  return JSON.stringify(val)
}

// ─── Render één JSX-element voor een sectie ───────────────────────────────────
function sectionToJSX(s: SectionConfig, baseIndent: string): string {
  const innerIndent = baseIndent + '  '
  const refs = CLIENT_REFS[s.type] ?? {}

  const propLines = [
    `${innerIndent}variant="${s.variant}"`,
    ...Object.entries(s.props).map(([key, val]) => {
      // Gebruik client config referentie als beschikbaar
      const ref = refs[key]
      if (ref) return `${innerIndent}${key}={${ref}}`
      // Anders: serialiseer de waarde
      if (typeof val === 'string') return `${innerIndent}${key}=${JSON.stringify(val)}`
      return `${innerIndent}${key}={${valueToCode(val, (innerIndent.length / 2) + 1)}}`
    }),
  ]

  return `${baseIndent}<${s.type}\n${propLines.join('\n')}\n${baseIndent}/>`
}

// ─── Genereer de volledige page.tsx broncode ──────────────────────────────────
export function generatePageCode(config: PageConfig): string {
  const usedTypes   = [...new Set(config.sections.map(s => s.type))]
  const usesClient  = config.sections.some(s => Object.keys(CLIENT_REFS[s.type] ?? {}).length > 0)

  const imports = [
    ...(usesClient ? ["import client from '@/../client.config'"] : []),
    ...usedTypes.map(t => `import { ${t} } from '@/components/organisms/${t}'`),
  ].join('\n')

  const navbars = config.sections.filter(s => s.type === 'Navbar')
  const footers = config.sections.filter(s => s.type === 'Footer')
  const main    = config.sections.filter(s => s.type !== 'Navbar' && s.type !== 'Footer')

  const parts: string[] = []

  navbars.forEach(s => parts.push(sectionToJSX(s, '      ')))

  if (main.length > 0) {
    const inner = main.map(s => sectionToJSX(s, '        ')).join('\n\n')
    parts.push(`      <main id="main-content" className="flex-1">\n${inner}\n      </main>`)
  }

  footers.forEach(s => parts.push(sectionToJSX(s, '      ')))

  const body = parts.join('\n\n')

  return `'use client'

${imports}

export default function Page() {
  return (
    <>
${body}
    </>
  )
}
`
}
