import { cn } from '@/lib/utils'

interface AboutBodyProps {
  text: string
  className?: string
}

export function AboutBody({ text, className }: AboutBodyProps) {
  return (
    <p
      className={cn(
        'text-base leading-relaxed text-brand-text/80 sm:text-lg',
        className
      )}
    >
      {text}
    </p>
  )
}
