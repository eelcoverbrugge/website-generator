import { CtaSectionDefault, type CtaSectionDefaultProps } from './CtaSectionDefault'
import { CtaSectionSplit } from './CtaSectionSplit'
import { CtaSectionGradient } from './CtaSectionGradient'
import { CtaSectionMinimal } from './CtaSectionMinimal'

export type CtaSectionVariant = 'default' | 'split' | 'gradient' | 'minimal'
export interface CtaSectionProps extends CtaSectionDefaultProps { variant?: CtaSectionVariant }

/**
 * CtaSection organism — 4 varianten
 * - 'default'  : full-width banner, primary/muted achtergrond
 * - 'split'    : tekst links, decoratief element rechts
 * - 'gradient' : gradient van brand-primary naar brand-secondary
 * - 'minimal'  : wit/licht, subtiel en professioneel
 */
export function CtaSection({ variant = 'default', ...props }: CtaSectionProps) {
  switch (variant) {
    case 'split':    return <CtaSectionSplit    {...props} />
    case 'gradient': return <CtaSectionGradient {...props} />
    case 'minimal':  return <CtaSectionMinimal  {...props} />
    default:         return <CtaSectionDefault  {...props} />
  }
}
