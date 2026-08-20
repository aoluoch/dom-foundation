import { useMemo, useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getResources } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconDownload } from '../components/ui/Icons'

export default function Resources() {
  const { data, loading, error } = useAsync(getResources, [])
  const [active, setActive] = useState('All')

  const categories = useMemo(() => {
    const set = new Set<string>()
    ;(data || []).forEach((r) => r.category && set.add(r.category))
    return ['All', ...Array.from(set)]
  }, [data])

  const filtered = (data || []).filter((r) => active === 'All' || r.category === active)

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Reports, briefs & downloads"
        subtitle="Explore our reports, brochures, policy briefs, and toolkits — everything you need to learn more and take action."
      />
      <section className="py-20">
        <div className="container-page">
          {error ? (
            <ErrorState />
          ) : loading || !data ? (
            <Loader />
          ) : (
            <>
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
                      {r.fileUrl ? 'Download' : 'Coming soon'}
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
