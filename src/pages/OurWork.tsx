import { useAsync } from '../hooks/useAsync'
import { getPageCopy, getPillars } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import PillarCard from '../components/ui/PillarCard'

async function loadOurWork() {
  const [page, pillars] = await Promise.all([getPageCopy('our-work'), getPillars()])
  return { page, pillars }
}

export default function OurWork() {
  const { data, loading, error } = useAsync(loadOurWork, [])

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />
  if (!data.page?.title) return <ErrorState message="Our Work page copy is missing in Contentful." />

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
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {data.pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
