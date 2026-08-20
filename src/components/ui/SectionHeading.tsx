interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', light }: Props) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={`eyebrow mb-3 ${light ? 'text-brand-lime' : ''}`}>
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl leading-tight sm:text-4xl ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/80' : 'text-ink/70'}`}>{subtitle}</p>}
    </div>
  )
}
