import type { PageConfig, SectionConfig } from './types'

// Serialize a JS value to valid JSX-embeddable code
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

// Render one JSX element for a section
function sectionToJSX(s: SectionConfig, baseIndent: string): string {
  const innerIndent = baseIndent + '  '

  const propLines = [
    `${innerIndent}variant="${s.variant}"`,
    ...Object.entries(s.props).map(([key, val]) => {
      if (typeof val === 'string') return `${innerIndent}${key}=${JSON.stringify(val)}`
      return `${innerIndent}${key}={${valueToCode(val, (innerIndent.length / 2) + 1)}}`
    }),
  ]

  return `${baseIndent}<${s.type}\n${propLines.join('\n')}\n${baseIndent}/>`
}

export function generatePageCode(config: PageConfig): string {
  const usedTypes = [...new Set(config.sections.map(s => s.type))]
  const imports = usedTypes
    .map(t => `import { ${t} } from '@/components/organisms/${t}'`)
    .join('\n')

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
