import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import type { PageConfig } from '@/lib/builder/types'
import { generatePageCode } from '@/lib/builder/codegen'

export async function POST(request: Request) {
  if (process.env.ENABLE_BUILDER !== 'true') {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const config: PageConfig = await request.json()

  if (!config.slug || !/^[a-z0-9][a-z0-9-]*$/.test(config.slug)) {
    return Response.json(
      { error: 'Ongeldige slug. Gebruik alleen kleine letters, cijfers en koppeltekens.' },
      { status: 400 }
    )
  }

  if (!Array.isArray(config.sections) || config.sections.length === 0) {
    return Response.json({ error: 'Pagina bevat geen secties.' }, { status: 400 })
  }

  const code = generatePageCode(config)
  const dir  = join(process.cwd(), 'src', 'app', config.slug)
  const file = join(dir, 'page.tsx')

  await mkdir(dir, { recursive: true })
  await writeFile(file, code, 'utf-8')

  return Response.json({
    success: true,
    path: `src/app/${config.slug}/page.tsx`,
    url:  `/${config.slug}`,
  })
}
