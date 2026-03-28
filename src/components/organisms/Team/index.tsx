import { TeamDefault, type TeamDefaultProps } from './TeamDefault'
import { TeamHorizontal } from './TeamHorizontal'
import { TeamMinimal } from './TeamMinimal'
import { TeamSpotlight } from './TeamSpotlight'

export type TeamVariant = 'default' | 'horizontal' | 'minimal' | 'spotlight'
export interface TeamProps extends TeamDefaultProps {
  variant?: TeamVariant
}

/**
 * Team organism
 *
 * @example
 * <Team
 *   variant="default"
 *   sectionLabel="Ons team"
 *   heading="De mensen achter het werk"
 *   members={[
 *     { name: 'Anna de Vries', role: 'Oprichter & Designer', image: { src: '/team/anna.jpg', alt: 'Anna de Vries' }, bio: 'Gepassioneerd door goede UX.' },
 *   ]}
 * />
 */
export function Team({ variant = 'default', ...props }: TeamProps) {
  switch (variant) {
    case 'horizontal':
      return <TeamHorizontal {...props} />
    case 'minimal':
      return <TeamMinimal {...props} />
    case 'spotlight':
      return <TeamSpotlight {...props} />
    case 'default':
    default:
      return <TeamDefault {...props} />
  }
}
