import { useMemo, useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getPageCopy, getResources } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconDownload } from '../components/ui/Icons'

async function loadResources() {
  const [page, resources] = await Promise.all([getPageCopy('resources'), getResources()])
  return { page, resources }
}

export default function Resources() {
  const { data, loading, error } = useAsync(loadResources, [])
  const [active, setActive] = useState('All')

  const categories = useMemo(() => {
    const set = new Set<string>()
    ;(data?.resources || []).forEach((r) => r.category && set.add(r.category))
    return ['All', ...Array.from(set)]
  }, [data])

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />
  if (!data.page?.title) return <ErrorState message="Resources page copy is missing in Contentful." />

  const filtered = data.resources.filter((r) => active === 'All' || r.category === active)
  const downloadLabel = data.page.heading
  const comingSoonLabel = data.page.panelTitle

  return (
    <>
      <PageHero
        eyebrow={data.page.eyebrow}
        title={data.page.title}
        subtitle={data.page.subtitle}
        image={data.page.heroImage?.url}
      />
      <section className="py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-heading font-semibold transition-colors ${
                  active === cat ? 'bg-brand-gradient text-white shadow-soft' : 'border border-brand/20 text-ink/70 hover:bg-brand/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <div key={r.id} className="card-lift flex flex-col rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                {r.category && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-heading font-semibold text-brand-dark">
                    {r.category}
                  </span>
                )}
                <h3 className="text-lg leading-snug">{r.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{r.description}</p>
                <a
                  href={r.fileUrl || '#'}
                  target={r.fileUrl ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-heading font-semibold ${
                    r.fileUrl ? 'text-brand-dark' : 'cursor-not-allowed text-ink/40'
                  }`}
                >
                  <IconDownload width={16} height={16} />
                  {r.fileUrl ? downloadLabel : comingSoonLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
