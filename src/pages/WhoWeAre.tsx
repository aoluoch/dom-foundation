import { useAsync } from '../hooks/useAsync'
import { getAbout } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { IconStar, IconUsers, valueIconMap } from '../components/ui/Icons'

function Paragraphs({ text }: { text?: string }) {
  if (!text) return null
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="mb-4 leading-relaxed text-ink/75">
          {p}
        </p>
      ))}
    </>
  )
}

export default function WhoWeAre() {
  const { data, loading, error } = useAsync(getAbout, [])
  if (error) return <ErrorState />
  if (loading || !data) return <Loader />

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Committed to the most vulnerable in society"
        subtitle="Serving communities across Kenya and Ghana — irrespective of origin, faith, or gender."
        image={data.heroImage?.url}
      />

      {/* About */}
      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="About DOM Foundation" title="A multifaceted approach to lasting change" />
            <div className="mt-6 text-lg">
              <Paragraphs text={data.about} />
            </div>
            {data.history && (
              <div className="mt-8 rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                <h3 className="text-xl">Our History</h3>
                <div className="mt-3">
                  <Paragraphs text={data.history} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
              <h3 className="text-xl text-white">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-white/90">{data.vision}</p>
            </div>
            <div className="rounded-3xl border border-gold/30 bg-white p-8 shadow-card">
              <h3 className="text-xl text-gold-dark">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-ink/80">{data.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionHeading eyebrow="What We Stand For" title="Our Core Values" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {data.values.map((v) => {
              const Icon = (v.icon && valueIconMap[v.icon]) || IconStar
              return (
                <div key={v.id} className="card-lift rounded-3xl border border-brand/10 bg-cream p-6 text-center shadow-card">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                    <Icon width={26} height={26} />
                  </div>
                  <h3 className="mt-5 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind the mission"
            subtitle="A dedicated team turning vision into tangible impact."
            align="center"
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {data.team.map((m) => (
              <div key={m.id} className="card-lift overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card">
                <div className="flex h-44 items-center justify-center bg-brand-gradient">
                  {m.photo ? (
                    <img src={m.photo.url} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white">
                      <IconUsers width={38} height={38} />
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg">{m.name}</h3>
                  {m.role && <p className="text-sm font-semibold text-gold-dark">{m.role}</p>}
                  {m.bio && <p className="mt-3 text-sm leading-relaxed text-ink/65">{m.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
