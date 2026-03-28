interface FooterCopyrightProps {
  text: string
}

export function FooterCopyright({ text }: FooterCopyrightProps) {
  return (
    <p className="text-sm text-brand-text/50">
      {text}
    </p>
  )
}
