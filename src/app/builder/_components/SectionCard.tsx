'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, ChevronRight, ChevronDown as ExpandIcon } from 'lucide-react'
import { REGISTRY } from '@/lib/builder/registry'
import type { SectionConfig } from '@/lib/builder/types'
import { NavbarEditor } from './NavbarEditor'
import { HeroEditor }   from './HeroEditor'
import { FooterEditor } from './FooterEditor'

interface Props {
  section:  SectionConfig
  isFirst:  boolean
  isLast:   boolean
  onMove:   (dir: 'up' | 'down') => void
  onRemove: () => void
  onUpdate: (patch: Partial<SectionConfig>) => void
}

export function SectionCard({ section, isFirst, isLast, onMove, onRemove, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false)
  const meta = REGISTRY[section.type]

  return (
    <div className="rounded-lg border border-border bg-background shadow-sm overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-1 px-3 py-2.5">
        {/* Move buttons */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={() => onMove('up')}
            disabled={isFirst}
            className="text-brand-text/30 hover:text-brand-text disabled:opacity-20 transition-colors"
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={isLast}
            className="text-brand-text/30 hover:text-brand-text disabled:opacity-20 transition-colors"
          >
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Label */}
        <span className="flex-1 text-sm font-medium text-brand-heading">
          {meta.label}
        </span>

        {/* Variant badge */}
        <span className="text-xs text-brand-text/40 font-mono">
          {section.variant}
        </span>

        {/* Delete */}
        <button
          onClick={onRemove}
          className="text-brand-text/30 hover:text-red-500 transition-colors ml-1"
        >
          <Trash2 size={14} />
        </button>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-brand-text/40 hover:text-brand-text transition-colors ml-1"
        >
          {expanded ? <ExpandIcon size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Expanded: variant picker + props editor */}
      {expanded && (
        <div className="border-t border-border px-3 py-3 space-y-4 bg-muted/20">
          {/* Variant picker */}
          <div>
            <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Variant</label>
            <div className="flex flex-wrap gap-1.5">
              {meta.variants.map(v => (
                <button
                  key={v}
                  onClick={() => onUpdate({ variant: v })}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    section.variant === v
                      ? 'bg-brand-primary text-white'
                      : 'border border-border text-brand-text/60 hover:border-brand-primary hover:text-brand-primary'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Props editor */}
          <div>
            <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Inhoud</label>
            {section.type === 'Navbar' && (
              <NavbarEditor
                props={section.props}
                onChange={p => onUpdate({ props: p })}
              />
            )}
            {section.type === 'Hero' && (
              <HeroEditor
                props={section.props}
                onChange={p => onUpdate({ props: p })}
              />
            )}
            {section.type === 'Footer' && (
              <FooterEditor
                props={section.props}
                onChange={p => onUpdate({ props: p })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
