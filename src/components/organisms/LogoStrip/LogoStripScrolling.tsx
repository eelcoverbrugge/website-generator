import Image from 'next/image'
import type { LogoStripDefaultProps } from './LogoStripDefault'

export function LogoStripScrolling({ label, logos }: LogoStripDefaultProps) {
  const doubled = [...logos, ...logos]

  return (
    <section aria-label="Klanten en partners" className="w-full border-y border-border bg-background py-8 overflow-hidden">
      {label && (
        <p className="text-center text-sm font-medium uppercase tracking-widest text-brand-text/50 mb-6">
          {label}
        </p>
      )}
      <div
        className="flex gap-12 lg:gap-16"
        style={{
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
        aria-hidden="true"
      >
        {doubled.map((logo, i) => (
          <div key={i} className="flex items-center justify-center shrink-0" style={{ width: logo.width ?? 120, height: logo.height ?? 40 }}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 120}
              height={logo.height ?? 40}
              className="object-contain grayscale opacity-50"
            />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  )
}
