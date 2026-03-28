import { StatsDefault, type StatsDefaultProps } from './StatsDefault'
import { StatsCards } from './StatsCards'
import { StatsCentered } from './StatsCentered'
import { StatsDark } from './StatsDark'

export type StatsVariant = 'default' | 'cards' | 'centered' | 'dark'
export interface StatsProps extends StatsDefaultProps { variant?: StatsVariant }

/**
 * Stats organism — 4 varianten
 * - 'default'  : horizontale rij met optionele primary/light achtergrond
 * - 'cards'    : bordered kaartjes per stat, responsive grid
 * - 'centered' : grote gecentreerde nummers, typografisch
 * - 'dark'     : donkere achtergrond, witte nummers
 */
export function Stats({ variant = 'default', ...props }: StatsProps) {
  switch (variant) {
    case 'cards':    return <StatsCards    {...props} />
    case 'centered': return <StatsCentered {...props} />
    case 'dark':     return <StatsDark     {...props} />
    default:         return <StatsDefault  {...props} />
  }
}
