import { Link, useParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getImpactStoryBySlug, getPageCopy } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import { IconArrowRight, IconPin } from '../components/ui/Icons'

async function loadStory(slug: string) {
  const [page, story] = await Promise.all([getPageCopy('story-detail'), getImpactStoryBySlug(slug)])
  return { page, story }
}

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useAsync(() => loadStory(slug || ''), [slug])

  if (loading) return <Loader />
  if (error) return <ErrorState />
  if (!data) return <ErrorState />

  const { page, story } = data

  if (!story) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="text-3xl">{page?.panelTitle}</h1>
        {page?.heading && (
          <Link to="/impact" className="btn-primary mt-6">
            {page.heading}
          </Link>
        )}
      </div>
    )
  }

  return (
    <article>
      <section className="relative overflow-hidden bg-ink">
        {story.image && <img src={story.image.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="container-page relative py-24">
          <div className="max-w-3xl animate-fade-up">
            {story.pillarTitle && (
              <Link
                to={story.pillarSlug ? `/our-work/${story.pillarSlug}` : '/our-work'}
                className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-heading font-semibold text-white"
              >
                {story.pillarTitle}
              </Link>
            )}
            <h1 className="text-4xl leading-tight text-white sm:text-5xl">{story.title}</h1>
            {story.location && (
              <p className="mt-4 inline-flex items-center gap-2 text-white/80">
                <IconPin width={18} height={18} /> {story.location}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page max-w-3xl">
          {story.summary && <p className="text-xl font-heading font-semibold leading-relaxed text-ink">{story.summary}</p>}
          <div className="mt-6">
            {story.body?.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 text-lg leading-relaxed text-ink/75">{p}</p>
            ))}
          </div>

          {story.quote && (
            <blockquote className="my-10 rounded-3xl bg-brand-forest p-8 text-white shadow-soft">
              <p className="text-xl italic leading-relaxed">“{story.quote}”</p>
              {story.author && <footer className="mt-4 font-heading text-sm font-semibold text-gold-light">— {story.author}</footer>}
            </blockquote>
          )}

          {page?.title && (
            <Link to="/impact" className="btn-outline mt-4">
              <IconArrowRight width={16} height={16} className="rotate-180" /> {page.title}
            </Link>
          )}
        </div>
      </section>
    </article>
  )
}
