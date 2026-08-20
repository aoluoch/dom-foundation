import { Link } from 'react-router-dom'
import type { StrategicPillar } from '../../types/content'
import { IconArrowRight, IconStar, pillarIconMap } from './Icons'

export default function PillarCard({ pillar }: { pillar: StrategicPillar }) {
  const Icon = pillarIconMap[pillar.icon] || IconStar
  const accent = pillar.accentColor || '#2E9E46'

  return (
    <Link
      to={`/our-work/${pillar.slug}`}
      className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card"
    >
      <div className="relative h-44 overflow-hidden">
        {pillar.heroImage ? (
          <img
            src={pillar.heroImage.url}
            alt={pillar.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-brand-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <div
          className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft"
          style={{ backgroundColor: accent }}
        >
          <Icon width={26} height={26} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="text-xl">{pillar.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{pillar.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-brand-dark">
          Learn more
          <IconArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
