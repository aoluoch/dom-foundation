import { useAsync } from '../hooks/useAsync'
import { getImpactStories } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import StoryCard from '../components/ui/StoryCard'

export default function Impact() {
  const { data, loading, error } = useAsync(getImpactStories, [])

  return (
    <>
      <PageHero
        eyebrow="Our Work & Impact"
        title="Stories of transformation"
        subtitle="Real people, real change. Meet the communities and champions at the heart of our mission."
      />
      <section className="py-20">
        <div className="container-page">
          {error ? (
            <ErrorState />
          ) : loading || !data ? (
            <Loader />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
