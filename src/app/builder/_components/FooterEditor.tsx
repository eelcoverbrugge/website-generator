'use client'

interface FooterProps {
  logo:      { src: string; alt: string; width?: number; height?: number }
  tagline?:  string
  copyright: string
  contact?:  { address?: string; phone?: string; email?: string }
}

interface Props {
  props:    Record<string, unknown>
  onChange: (props: Record<string, unknown>) => void
}

export function FooterEditor({ props, onChange }: Props) {
  const p = props as unknown as FooterProps

  function set(patch: Partial<FooterProps>) {
    onChange({ ...props, ...patch })
  }

  function setContact(patch: Partial<NonNullable<FooterProps['contact']>>) {
    set({ contact: { ...p.contact, ...patch } })
  }

  return (
    <div className="space-y-3">
      <Field label="Logo alt-tekst">
        <Input
          value={p.logo.alt}
          onChange={v => set({ logo: { ...p.logo, alt: v } })}
        />
      </Field>

      <Field label="Tagline">
        <Input
          value={p.tagline ?? ''}
          onChange={v => set({ tagline: v || undefined })}
          placeholder="bv. Wij helpen MKB groeien."
        />
      </Field>

      <Field label="Copyright">
        <Input
          value={p.copyright}
          onChange={v => set({ copyright: v })}
          placeholder="© 2025 Bedrijfsnaam."
        />
      </Field>

      <div>
        <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Contactgegevens</label>
        <div className="space-y-1.5">
          <Input
            value={p.contact?.address ?? ''}
            onChange={v => setContact({ address: v || undefined })}
            placeholder="Adres"
          />
          <Input
            value={p.contact?.phone ?? ''}
            onChange={v => setContact({ phone: v || undefined })}
            placeholder="Telefoonnummer"
          />
          <Input
            value={p.contact?.email ?? ''}
            onChange={v => setContact({ email: v || undefined })}
            placeholder="E-mailadres"
          />
        </div>
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
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full text-xs border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background"
    />
  )
}
