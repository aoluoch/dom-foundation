import { Link, useParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getPageCopy, getPillarBySlug, getPillars } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconArrowRight, IconCheck, IconStar, pillarIconMap } from '../components/ui/Icons'

async function loadPillar(slug: string) {
  const [page, pillar, allPillars] = await Promise.all([
    getPageCopy('pillar-detail'),
    getPillarBySlug(slug),
    getPillars(),
  ])
  return { page, pillar, allPillars }
}

export default function PillarDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useAsync(() => loadPillar(slug || ''), [slug])

  if (loading) return <Loader />
  if (error) return <ErrorState />
  if (!data) return <ErrorState />

  const { page, pillar, allPillars } = data

  if (!pillar) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="text-3xl">{page?.panelTitle}</h1>
        {page?.panelItems?.[0] && (
          <Link to="/our-work" className="btn-primary mt-6">
            {page.panelItems[0]}
          </Link>
        )}
      </div>
    )
  }

  const Icon = pillarIconMap[pillar.icon] || IconStar
  const others = allPillars.filter((p) => p.slug !== pillar.slug).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={pillar.title} subtitle={pillar.summary} image={pillar.heroImage?.url} />

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-soft"
                style={{ backgroundColor: pillar.accentColor || '#2E9E46' }}
              >
                <Icon width={30} height={30} />
              </div>
              <h3 className="mt-5 text-xl">{pillar.title}</h3>
              {page?.subtitle && <p className="mt-2 text-sm text-ink/60">{page.subtitle}</p>}
              <ul className="mt-4 space-y-1.5">
                {others.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/our-work/${p.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand-dark"
                    >
                      {p.title}
                      <IconArrowRight width={15} height={15} />
                    </Link>
                  </li>
                ))}
              </ul>
              {page?.panelBody && (
                <Link to="/get-involved" className="btn-primary mt-6 w-full">
                  {page.panelBody}
                </Link>
              )}
            </div>
          </aside>

          <div>
            {page?.formTitle && <h2 className="text-2xl sm:text-3xl">{page.formTitle}</h2>}
            <div className="mt-4">
              {pillar.overview?.split('\n\n').map((p, i) => (
                <p key={i} className="mb-4 text-lg leading-relaxed text-ink/75">{p}</p>
              ))}
            </div>

            {pillar.workSections && pillar.workSections.length > 0 && (
              <div className="mt-12">
                {page?.title && <h2 className="text-2xl sm:text-3xl">{page.title}</h2>}
                <div className="mt-6 space-y-6">
                  {pillar.workSections.map((section, idx) => (
                    <div key={idx} className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                      <h3 className="text-xl text-brand-dark">{section.title}</h3>
                      {section.description && (
                        <p className="mt-3 leading-relaxed text-ink/75">{section.description}</p>
                      )}
                      {section.items && section.items.length > 0 && (
                        <ul className="mt-4 space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                                <IconCheck width={15} height={15} />
                              </span>
                              <span className="text-ink/75">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
