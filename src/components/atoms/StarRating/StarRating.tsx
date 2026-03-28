import { MdStar, MdStarBorder } from 'react-icons/md'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  className?: string
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} van ${max} sterren`}>
      {Array.from({ length: max }, (_, i) => (
        i < rating
          ? <MdStar key={i} size={16} className="text-brand-accent" aria-hidden="true" />
          : <MdStarBorder key={i} size={16} className="text-brand-text/30" aria-hidden="true" />
      ))}
    </div>
  )
}
