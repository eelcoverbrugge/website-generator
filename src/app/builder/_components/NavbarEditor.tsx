'use client'

import { Plus, Trash2 } from 'lucide-react'

interface NavItem { label: string; href: string }
interface NavbarProps {
  logo:        { src: string; alt: string; width?: number; height?: number }
  items:       NavItem[]
  cta?:        { label: string; href: string }
  currentPath?: string
}

interface Props {
  props:    Record<string, unknown>
  onChange: (props: Record<string, unknown>) => void
}

export function NavbarEditor({ props, onChange }: Props) {
  const p = props as unknown as NavbarProps

  function set(patch: Partial<NavbarProps>) {
    onChange({ ...props, ...patch })
  }

  function updateItem(idx: number, field: keyof NavItem, value: string) {
    const items = [...p.items]
    items[idx] = { ...items[idx], [field]: value }
    set({ items })
  }

  function addItem() {
    set({ items: [...p.items, { label: 'Nieuw item', href: '/' }] })
  }

  function removeItem(idx: number) {
    set({ items: p.items.filter((_, i) => i !== idx) })
  }

  return (
    <div className="space-y-4">
      {/* Logo */}
      <Field label="Logo alt-tekst">
        <Input
          value={p.logo.alt}
          onChange={v => set({ logo: { ...p.logo, alt: v } })}
        />
      </Field>

      {/* Nav items */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-brand-text/60">Menu-items</label>
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-xs text-brand-primary hover:underline"
          >
            <Plus size={12} /> item
          </button>
        </div>
        <div className="space-y-1.5">
          {p.items.map((item, idx) => (
            <div key={idx} className="flex gap-1.5 items-center">
              <Input
                value={item.label}
                onChange={v => updateItem(idx, 'label', v)}
                placeholder="Label"
                className="flex-1"
              />
              <Input
                value={item.href}
                onChange={v => updateItem(idx, 'href', v)}
                placeholder="/pad"
                className="flex-1"
              />
              <button
                onClick={() => removeItem(idx)}
                className="text-brand-text/30 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-brand-text/60">CTA-knop</label>
          <button
            onClick={() =>
              set({ cta: p.cta ? undefined : { label: 'Gratis offerte', href: '/contact' } })
            }
            className="text-xs text-brand-primary hover:underline"
          >
            {p.cta ? 'Verwijderen' : 'Toevoegen'}
          </button>
        </div>
        {p.cta && (
          <div className="flex gap-1.5">
            <Input
              value={p.cta.label}
              onChange={v => set({ cta: { ...p.cta!, label: v } })}
              placeholder="Label"
              className="flex-1"
            />
            <Input
              value={p.cta.href}
              onChange={v => set({ cta: { ...p.cta!, href: v } })}
              placeholder="/pad"
              className="flex-1"
            />
          </div>
        )}
      </div>
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

function Input({
  value,
  onChange,
  placeholder,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
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
