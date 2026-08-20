import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  image?: string
  children?: ReactNode
}

export default function PageHero({ eyebrow, title, subtitle, image, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      )}
      {!image && <div className="absolute inset-0 bg-brand-gradient opacity-95" />}
      <div className="container-page relative py-20 sm:py-24">
        <div className="max-w-2xl animate-fade-up">
          {eyebrow && (
            <span className="eyebrow mb-4 text-brand-lime">
              <span className="h-px w-6 bg-current" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl leading-tight text-white sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
