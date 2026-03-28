'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import clientDefault from '@/../client.config'
import type { ClientConfig, FontBody, FontHeading } from '@/lib/client/types'

// ─── Font opties ──────────────────────────────────────────────────────────────
const FONT_BODY_OPTIONS: { value: FontBody; label: string }[] = [
  { value: 'inter',       label: 'Inter (modern, clean)' },
  { value: 'source-sans', label: 'Source Sans 3 (leesbaar)' },
  { value: 'lato',        label: 'Lato (vriendelijk)' },
]
const FONT_HEADING_OPTIONS: { value: FontHeading; label: string }[] = [
  { value: 'playfair',     label: 'Playfair Display (klassiek)' },
  { value: 'merriweather', label: 'Merriweather (gezaghebbend)' },
  { value: 'raleway',      label: 'Raleway (modern)' },
]

// CSS-variabelen per font-sleutel (gespiegeld aan layout.tsx)
const FONT_BODY_CSS: Record<FontBody, string> = {
  'inter':       '--font-inter',
  'source-sans': '--font-source-sans',
  'lato':        '--font-lato',
}
const FONT_HEADING_CSS: Record<FontHeading, string> = {
  'playfair':     '--font-playfair',
  'merriweather': '--font-merriweather',
  'raleway':      '--font-raleway',
}

// ─── Initiële state van client.config ────────────────────────────────────────
function initialState(): ClientConfig {
  return structuredClone(clientDefault as ClientConfig)
}

// ─── Hoofd-component ─────────────────────────────────────────────────────────
export function SettingsPanel() {
  const [cfg,    setCfg]    = useState<ClientConfig>(initialState)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  // Live preview: injecteer CSS custom properties bij elke branding-wijziging
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--brand-primary',   cfg.branding.primary)
    root.style.setProperty('--brand-secondary', cfg.branding.secondary)
    root.style.setProperty('--brand-accent',    cfg.branding.accent)
    root.style.setProperty('--brand-heading',   cfg.branding.heading)
    root.style.setProperty('--brand-text',      cfg.branding.text)
    root.style.setProperty('--font-body',    `var(${FONT_BODY_CSS[cfg.branding.fontBody]})`)
    root.style.setProperty('--font-display', `var(${FONT_HEADING_CSS[cfg.branding.fontHeading]})`)
  }, [cfg.branding])

  function setBranding(patch: Partial<ClientConfig['branding']>) {
    setCfg(prev => ({ ...prev, branding: { ...prev.branding, ...patch } }))
  }
  function setContact(patch: Partial<ClientConfig['contact']>) {
    setCfg(prev => ({ ...prev, contact: { ...prev.contact, ...patch } }))
  }
  function setSeo(patch: Partial<ClientConfig['seo']>) {
    setCfg(prev => ({ ...prev, seo: { ...prev.seo, ...patch } }))
  }
  function setNavItem(idx: number, field: 'label' | 'href', value: string) {
    const items = [...cfg.nav.items]
    items[idx] = { ...items[idx], [field]: value }
    setCfg(prev => ({ ...prev, nav: { ...prev.nav, items } }))
  }
  function addNavItem() {
    setCfg(prev => ({
      ...prev,
      nav: { ...prev.nav, items: [...prev.nav.items, { label: 'Nieuw', href: '/' }] },
    }))
  }
  function removeNavItem(idx: number) {
    setCfg(prev => ({
      ...prev,
      nav: { ...prev.nav, items: prev.nav.items.filter((_, i) => i !== idx) },
    }))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const res = await fetch('/api/builder/config', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(cfg),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Onbekende fout')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Onbekende fout')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* ── Bedrijf ─────────────────────────────────── */}
        <Section title="Bedrijf">
          <Field label="Naam">
            <TextInput value={cfg.name} onChange={v => setCfg(p => ({ ...p, name: v }))} placeholder="Bakkerij De Wit" />
          </Field>
          <Field label="Domein">
            <TextInput value={cfg.domain} onChange={v => setCfg(p => ({ ...p, domain: v }))} placeholder="bakkerijdewit.nl" />
          </Field>
        </Section>

        {/* ── Branding ────────────────────────────────── */}
        <Section title="Branding">
          <ColorField label="Primair"   value={cfg.branding.primary}   onChange={v => setBranding({ primary: v })} />
          <ColorField label="Secundair" value={cfg.branding.secondary} onChange={v => setBranding({ secondary: v })} />
          <ColorField label="Accent"    value={cfg.branding.accent}    onChange={v => setBranding({ accent: v })} />
          <ColorField label="Koppen"    value={cfg.branding.heading}   onChange={v => setBranding({ heading: v })} />
          <ColorField label="Tekst"     value={cfg.branding.text}      onChange={v => setBranding({ text: v })} />

          <Field label="Font body">
            <Select
              value={cfg.branding.fontBody}
              onChange={v => setBranding({ fontBody: v as FontBody })}
              options={FONT_BODY_OPTIONS}
            />
          </Field>
          <Field label="Font koppen">
            <Select
              value={cfg.branding.fontHeading}
              onChange={v => setBranding({ fontHeading: v as FontHeading })}
              options={FONT_HEADING_OPTIONS}
            />
          </Field>
        </Section>

        {/* ── Logo ────────────────────────────────────── */}
        <Section title="Logo">
          <Field label="Pad">
            <TextInput value={cfg.logo.src} onChange={v => setCfg(p => ({ ...p, logo: { ...p.logo, src: v } }))} placeholder="/logo.svg" />
          </Field>
          <Field label="Alt-tekst">
            <TextInput value={cfg.logo.alt} onChange={v => setCfg(p => ({ ...p, logo: { ...p.logo, alt: v } }))} placeholder="Bedrijfsnaam" />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Breedte (px)">
              <TextInput
                value={String(cfg.logo.width ?? 120)}
                onChange={v => setCfg(p => ({ ...p, logo: { ...p.logo, width: parseInt(v) || 120 } }))}
                placeholder="120"
              />
            </Field>
            <Field label="Hoogte (px)">
              <TextInput
                value={String(cfg.logo.height ?? 36)}
                onChange={v => setCfg(p => ({ ...p, logo: { ...p.logo, height: parseInt(v) || 36 } }))}
                placeholder="36"
              />
            </Field>
          </div>
        </Section>

        {/* ── Contact ─────────────────────────────────── */}
        <Section title="Contact">
          <Field label="Adres">
            <TextInput value={cfg.contact.address ?? ''} onChange={v => setContact({ address: v || undefined })} placeholder="Hoofdstraat 1, 1234 AB Amsterdam" />
          </Field>
          <Field label="Telefoon">
            <TextInput value={cfg.contact.phone ?? ''} onChange={v => setContact({ phone: v || undefined })} placeholder="020 123 4567" />
          </Field>
          <Field label="E-mail">
            <TextInput value={cfg.contact.email ?? ''} onChange={v => setContact({ email: v || undefined })} placeholder="info@bedrijf.nl" />
          </Field>
          <Field label="Openingstijden">
            <TextInput value={cfg.contact.openingHours ?? ''} onChange={v => setContact({ openingHours: v || undefined })} placeholder="Ma–Vr: 9:00–17:00" />
          </Field>
        </Section>

        {/* ── SEO ─────────────────────────────────────── */}
        <Section title="SEO">
          <Field label="Paginatitel">
            <TextInput value={cfg.seo.title} onChange={v => setSeo({ title: v })} placeholder="Bedrijfsnaam — Slogan" />
          </Field>
          <Field label="Meta-omschrijving">
            <textarea
              value={cfg.seo.description}
              onChange={e => setSeo({ description: e.target.value })}
              rows={3}
              className="w-full text-xs border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background resize-none"
              placeholder="Korte omschrijving voor Google (150–160 tekens)."
            />
            <p className={`text-xs mt-0.5 ${cfg.seo.description.length > 160 ? 'text-red-500' : 'text-brand-text/40'}`}>
              {cfg.seo.description.length} / 160 tekens
            </p>
          </Field>
          <Field label="OG-afbeelding">
            <TextInput value={cfg.seo.ogImage ?? ''} onChange={v => setSeo({ ogImage: v || undefined })} placeholder="/og-image.jpg" />
          </Field>
        </Section>

        {/* ── Navigatie ───────────────────────────────── */}
        <Section title="Navigatie">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-brand-text/60">Menu-items</label>
              <button onClick={addNavItem} className="flex items-center gap-1 text-xs text-brand-primary hover:underline">
                <Plus size={11} /> item
              </button>
            </div>
            <div className="space-y-1.5">
              {cfg.nav.items.map((item, idx) => (
                <div key={idx} className="flex gap-1.5 items-center">
                  <TextInput value={item.label} onChange={v => setNavItem(idx, 'label', v)} placeholder="Label" className="flex-1" />
                  <TextInput value={item.href}  onChange={v => setNavItem(idx, 'href',  v)} placeholder="/pad"  className="flex-1" />
                  <button onClick={() => removeNavItem(idx)} className="text-brand-text/30 hover:text-red-500 transition-colors shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-brand-text/60">CTA-knop</label>
              <button
                onClick={() =>
                  setCfg(p => ({
                    ...p,
                    nav: { ...p.nav, cta: p.nav.cta ? undefined : { label: 'Gratis offerte', href: '/contact' } },
                  }))
                }
                className="text-xs text-brand-primary hover:underline"
              >
                {cfg.nav.cta ? 'Verwijderen' : 'Toevoegen'}
              </button>
            </div>
            {cfg.nav.cta && (
              <div className="flex gap-1.5">
                <TextInput
                  value={cfg.nav.cta.label}
                  onChange={v => setCfg(p => ({ ...p, nav: { ...p.nav, cta: { ...p.nav.cta!, label: v } } }))}
                  placeholder="Label"
                  className="flex-1"
                />
                <TextInput
                  value={cfg.nav.cta.href}
                  onChange={v => setCfg(p => ({ ...p, nav: { ...p.nav, cta: { ...p.nav.cta!, href: v } } }))}
                  placeholder="/pad"
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </Section>

      </div>

      {/* ── Opslaan ─────────────────────────────────────── */}
      <div className="p-4 border-t border-border shrink-0 space-y-2">
        {saved && (
          <div className="flex items-center gap-1.5 p-3 rounded-md bg-green-50 border border-green-200 text-xs text-green-800">
            <Check size={13} /> Opgeslagen in client.config.ts
          </div>
        )}
        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}
        <button
          onClick={save}
          disabled={saving}
          className="w-full py-2.5 rounded-md bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 disabled:opacity-40 transition-colors"
        >
          {saving ? 'Opslaan…' : 'Opslaan'}
        </button>
        <p className="text-xs text-brand-text/30 text-center">
          Schrijft naar client.config.ts — dev server herlaadt automatisch
        </p>
      </div>
    </div>
  )
}

// ─── Hulpcomponenten ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-brand-text/50 uppercase tracking-wider mb-3 pb-1.5 border-b border-border">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-text/60 mb-1">{label}</label>
      {children}
    </div>
  )
}

function TextInput({
  value, onChange, placeholder, className = '',
}: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full text-xs border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background ${className}`}
    />
  )
}

function Select({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-xs border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background"
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function ColorField({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-brand-text/60 w-20 shrink-0">{label}</span>
      <input
        type="color"
        value={value.startsWith('#') ? value : '#000000'}
        onChange={e => onChange(e.target.value)}
        className="w-7 h-7 rounded cursor-pointer border border-border shrink-0 p-0.5 bg-background"
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 text-xs font-mono border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background"
        placeholder="#000000"
      />
    </div>
  )
}
