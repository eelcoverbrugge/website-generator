'use client'

interface HeroProps {
  badge?:        string
  headline:      string
  subtext:       string
  primaryCTA:    { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  image:         { src: string; alt: string }
}

interface Props {
  props:    Record<string, unknown>
  onChange: (props: Record<string, unknown>) => void
}

export function HeroEditor({ props, onChange }: Props) {
  const p = props as unknown as HeroProps

  function set(patch: Partial<HeroProps>) {
    onChange({ ...props, ...patch })
  }

  return (
    <div className="space-y-3">
      <Field label="Badge (optioneel)">
        <Input
          value={p.badge ?? ''}
          onChange={v => set({ badge: v || undefined })}
          placeholder="bv. Gratis adviesgesprek"
        />
      </Field>

      <Field label="Headline">
        <Input
          value={p.headline}
          onChange={v => set({ headline: v })}
          placeholder="Hoofdtitel"
        />
      </Field>

      <Field label="Subtekst">
        <textarea
          value={p.subtext}
          onChange={e => set({ subtext: e.target.value })}
          rows={2}
          className="w-full text-xs border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary bg-background resize-none"
          placeholder="Korte omschrijving..."
        />
      </Field>

      <div>
        <label className="block text-xs font-medium text-brand-text/60 mb-1">Primaire CTA</label>
        <div className="flex gap-1.5">
          <Input
            value={p.primaryCTA.label}
            onChange={v => set({ primaryCTA: { ...p.primaryCTA, label: v } })}
            placeholder="Label"
            className="flex-1"
          />
          <Input
            value={p.primaryCTA.href}
            onChange={v => set({ primaryCTA: { ...p.primaryCTA, href: v } })}
            placeholder="/pad"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-brand-text/60">Secundaire CTA (optioneel)</label>
          <button
            onClick={() =>
              set({
                secondaryCTA: p.secondaryCTA
                  ? undefined
                  : { label: 'Meer informatie', href: '/over-ons' },
              })
            }
            className="text-xs text-brand-primary hover:underline"
          >
            {p.secondaryCTA ? 'Verwijderen' : 'Toevoegen'}
          </button>
        </div>
        {p.secondaryCTA && (
          <div className="flex gap-1.5">
            <Input
              value={p.secondaryCTA.label}
              onChange={v => set({ secondaryCTA: { ...p.secondaryCTA!, label: v } })}
              placeholder="Label"
              className="flex-1"
            />
            <Input
              value={p.secondaryCTA.href}
              onChange={v => set({ secondaryCTA: { ...p.secondaryCTA!, href: v } })}
              placeholder="/pad"
              className="flex-1"
            />
          </div>
        )}
      </div>

      <Field label="Afbeelding alt-tekst">
        <Input
          value={p.image.alt}
          onChange={v => set({ image: { ...p.image, alt: v } })}
          placeholder="Omschrijving afbeelding"
        />
      </Field>
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
