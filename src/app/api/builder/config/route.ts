import { writeFile } from 'fs/promises'
import { join } from 'path'
import type { ClientConfig } from '@/lib/client/types'
import { generateConfigCode } from '@/lib/builder/configgen'

export async function POST(request: Request) {
  if (process.env.ENABLE_BUILDER !== 'true') {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const cfg: ClientConfig = await request.json()

  if (!cfg.name?.trim() || !cfg.domain?.trim()) {
    return Response.json({ error: 'Naam en domein zijn verplicht.' }, { status: 400 })
  }

  const code = generateConfigCode(cfg)
  const file = join(process.cwd(), 'client.config.ts')

  await writeFile(file, code, 'utf-8')

  return Response.json({ success: true })
}
