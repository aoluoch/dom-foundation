import { useAsync } from '../hooks/useAsync'
import { getPillars } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import PillarCard from '../components/ui/PillarCard'

export default function OurWork() {
  const { data, loading, error } = useAsync(getPillars, [])

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Six pillars, one mission"
        subtitle="Our strategic pillars work together to help vulnerable individuals and communities become self-reliant."
      />
      <section className="py-20">
        <div className="container-page">
          {error ? (
            <ErrorState />
          ) : loading || !data ? (
            <Loader />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((p) => (
                <PillarCard key={p.id} pillar={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
