import { Link } from 'react-router-dom'
import type { ImpactStory } from '../../types/content'
import { IconArrowRight, IconPin } from './Icons'

export default function StoryCard({ story }: { story: ImpactStory }) {
  return (
    <Link
      to={`/impact/${story.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card"
    >
      <div className="relative h-52 overflow-hidden">
        {story.image ? (
          <img
            src={story.image.url}
            alt={story.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-brand-gradient" />
        )}
        {story.pillarTitle && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-heading font-semibold text-brand-dark">
            {story.pillarTitle}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {story.location && (
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-dark">
            <IconPin width={14} height={14} /> {story.location}
          </span>
        )}
        <h3 className="text-lg leading-snug">{story.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{story.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-brand-dark">
          Read story
          <IconArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
