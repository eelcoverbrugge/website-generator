import { cn } from '@/lib/utils'

interface TestimonialQuoteProps {
  text: string
  className?: string
}

export function TestimonialQuote({ text, className }: TestimonialQuoteProps) {
  return (
    <blockquote
      className={cn('text-sm leading-relaxed text-brand-text/80 italic', className)}
    >
      &ldquo;{text}&rdquo;
    </blockquote>
  )
}
