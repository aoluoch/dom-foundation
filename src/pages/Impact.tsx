import { useAsync } from '../hooks/useAsync'
import { getImpactStories, getPageCopy } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import StoryCard from '../components/ui/StoryCard'

async function loadImpact() {
  const [page, stories] = await Promise.all([getPageCopy('impact'), getImpactStories()])
  return { page, stories }
}

export default function Impact() {
  const { data, loading, error } = useAsync(loadImpact, [])

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />
  if (!data.page?.title) return <ErrorState message="Impact page copy is missing in Contentful." />

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
            {data.stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
