'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { REGISTRY } from '@/lib/builder/registry'
import type { SectionConfig, PageConfig, SectionType } from '@/lib/builder/types'
import { SectionCard }   from './_components/SectionCard'
import { PreviewPanel }  from './_components/PreviewPanel'
import { SettingsPanel } from './_components/SettingsPanel'

type Tab = 'pages' | 'settings'

export default function BuilderPage() {
  const [tab,        setTab]        = useState<Tab>('pages')
  const [slug,       setSlug]       = useState('mijn-pagina')
  const [sections,   setSections]   = useState<SectionConfig[]>([])
  const [generating, setGenerating] = useState(false)
  const [result,     setResult]     = useState<{ url: string; path: string } | null>(null)
  const [error,      setError]      = useState<string | null>(null)

  function addSection(type: SectionType) {
    const meta = REGISTRY[type]
    setSections(prev => [
      ...prev,
      { id: crypto.randomUUID(), type, variant: meta.variants[0], props: structuredClone(meta.defaultProps) },
    ])
    setResult(null)
  }

  function removeSection(id: string) {
    setSections(prev => prev.filter(s => s.id !== id))
  }

  function moveSection(id: string, dir: 'up' | 'down') {
    setSections(prev => {
      const idx  = prev.findIndex(s => s.id === id)
      const swap = dir === 'up' ? idx - 1 : idx + 1
      if (swap < 0 || swap >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  function updateSection(id: string, patch: Partial<SectionConfig>) {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  async function generate() {
    setGenerating(true)
    setResult(null)
    setError(null)
    try {
      const config: PageConfig = { slug, sections }
      const res  = await fetch('/api/builder/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body:   JSON.stringify(config),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Onbekende fout')
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Onbekende fout')
    } finally {
      setGenerating(false)
    }
  }

  const canGenerate = sections.length > 0 && /^[a-z0-9][a-z0-9-]*$/.test(slug)

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">

      {/* ── Left sidebar ──────────────────────────────── */}
      <aside className="w-96 shrink-0 bg-background border-r border-border flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-4 pt-4 pb-0 shrink-0">
          <h1 className="font-heading text-lg font-bold text-brand-heading mb-3">
            Page Builder
          </h1>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
            {(['pages', 'settings'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  tab === t
                    ? 'bg-background text-brand-heading shadow-sm'
                    : 'text-brand-text/50 hover:text-brand-text'
                }`}
              >
                {t === 'pages' ? "Pagina's" : 'Instellingen'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab: Pagina's ─────────────────────────────── */}
        {tab === 'pages' && (
          <>
            {/* Slug input */}
            <div className="px-4 py-3 border-b border-border shrink-0">
              <label className="block text-xs font-medium text-brand-text/60 mb-1">Pagina-URL</label>
              <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-brand-primary">
                <span className="pl-2.5 text-xs text-brand-text/40 select-none shrink-0">/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={e =>
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-/, ''))
                  }
                  className="flex-1 py-1.5 pr-2.5 text-xs bg-background focus:outline-none"
                  placeholder="mijn-pagina"
                />
              </div>
            </div>

            {/* Add section buttons */}
            <div className="px-4 py-3 border-b border-border shrink-0">
              <p className="text-xs font-medium text-brand-text/50 uppercase tracking-wider mb-2">
                Sectie toevoegen
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(REGISTRY) as SectionType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => addSection(type)}
                    className="text-xs px-3 py-1.5 rounded-md border border-brand-primary/40 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors font-medium"
                  >
                    + {REGISTRY[type].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {sections.length === 0 ? (
                <p className="text-sm text-brand-text/30 text-center py-12">
                  Voeg een sectie toe om te beginnen
                </p>
              ) : (
                sections.map((section, idx) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    isFirst={idx === 0}
                    isLast={idx === sections.length - 1}
                    onMove={dir => moveSection(section.id, dir)}
                    onRemove={() => removeSection(section.id)}
                    onUpdate={patch => updateSection(section.id, patch)}
                  />
                ))
              )}
            </div>

            {/* Generate */}
            <div className="p-4 border-t border-border shrink-0 space-y-2">
              {result && (
                <div className="p-3 rounded-md bg-green-50 border border-green-200 text-xs">
                  <p className="font-semibold text-green-800 mb-0.5">Pagina gegenereerd!</p>
                  <p className="text-green-700 font-mono mb-1">{result.path}</p>
                  <a href={result.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-700 hover:underline">
                    Bekijk pagina <ExternalLink size={11} />
                  </a>
                </div>
              )}
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}
              <button
                onClick={generate}
                disabled={!canGenerate || generating}
                className="w-full py-2.5 rounded-md bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {generating ? 'Genereren…' : 'Genereer pagina'}
              </button>
            </div>
          </>
        )}

        {/* ── Tab: Instellingen ─────────────────────────── */}
        {tab === 'settings' && <SettingsPanel />}

      </aside>

      {/* ── Preview panel ─────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-2 bg-background border-b border-border shrink-0 flex items-center gap-2">
          <span className="text-xs font-medium text-brand-text/40 uppercase tracking-wider">
            Live preview
          </span>
          {tab === 'pages' && (
            <span className="text-xs text-brand-text/25 font-mono">/{slug}</span>
          )}
          {tab === 'settings' && (
            <span className="text-xs text-brand-text/25">kleuren en fonts updaten direct</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          <PreviewPanel sections={sections} />
        </div>
      </div>

    </div>
  )
}
