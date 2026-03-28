import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { SectionHeading } from '@/components/atoms/SectionHeading'
import { SectionSubtext } from '@/components/atoms/SectionSubtext'

interface SectionHeaderProps {
  label?: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  heading,
  subtext,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
    >
      {label && <SectionLabel text={label} />}
      <SectionHeading text={heading} />
      {subtext && <SectionSubtext text={subtext} />}
    </div>
  )
}
