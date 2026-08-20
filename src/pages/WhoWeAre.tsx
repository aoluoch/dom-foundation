import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getAbout, getInvolvedOptions } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { IconHands, IconHeart, IconStar, IconUsers, pillarIconMap, valueIconMap } from '../components/ui/Icons'

const iconMap = { ...valueIconMap, ...pillarIconMap }

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
  const { data: options } = useAsync(getInvolvedOptions, [])
  if (error) return <ErrorState />
  if (loading || !data) return <Loader />

  const donate = options?.find((o) => o.optionType === 'Donate')
  const volunteer = options?.find((o) => o.optionType === 'Volunteer')
  const holistic = data.holisticItems || []

  return (
    <>
      <PageHero eyebrow={data.sectionEyebrow} title={data.headline || ''} subtitle={data.subtitle} image={data.heroImage?.url} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow={data.sectionEyebrow} title={data.sectionTitle || ''} />
            <div className="mt-6 text-lg">
              <Paragraphs text={data.about} />
            </div>
            {data.history && (
              <div className="mt-8 rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                {data.historyTitle && <h3 className="text-xl">{data.historyTitle}</h3>}
                <div className="mt-3">
                  <Paragraphs text={data.history} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data.vision && (
              <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
                {data.visionTitle && <h3 className="text-xl text-white">{data.visionTitle}</h3>}
                <p className="mt-3 leading-relaxed text-white/90">{data.vision}</p>
              </div>
            )}
            {data.mission && (
              <div className="rounded-3xl border border-gold/30 bg-white p-8 shadow-card">
                {data.missionTitle && <h3 className="text-xl text-gold-dark">{data.missionTitle}</h3>}
                <p className="mt-3 leading-relaxed text-ink/80">{data.mission}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {holistic.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow={data.holisticEyebrow}
              title={data.holisticTitle || ''}
              subtitle={data.holisticIntro}
              align="center"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {holistic.map((item) => {
                const Icon = (item.icon && iconMap[item.icon]) || IconStar
                return (
                  <div key={item.title} className="card-lift rounded-3xl border border-brand/10 bg-cream p-6 shadow-card">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                      <Icon width={26} height={26} />
                    </div>
                    <h3 className="mt-5 text-lg">{item.title}</h3>
                    {item.description && <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {data.values.length > 0 && (
        <section className="py-20">
          <div className="container-page">
            <SectionHeading eyebrow={data.valuesEyebrow} title={data.valuesTitle || ''} align="center" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {data.values.map((v) => {
                const Icon = (v.icon && iconMap[v.icon]) || IconStar
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
      )}

      {data.team.length > 0 && (
        <section className="bg-cream py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow={data.teamEyebrow}
              title={data.teamTitle || ''}
              subtitle={data.teamSubtitle}
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
      )}

      {(data.joinTitle || data.joinBody) && (
        <section className="container-page pb-4">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-8 py-14 text-center text-white shadow-soft sm:px-16">
            {data.joinTitle && (
              <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-white sm:text-4xl">{data.joinTitle}</h2>
            )}
            {data.joinBody && <p className="mx-auto mt-4 max-w-xl text-white/85">{data.joinBody}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {donate?.ctaLabel && (
                <Link to="/donate" className="btn bg-white text-brand-dark hover:bg-white/90">
                  <IconHeart width={18} height={18} /> {donate.ctaLabel}
                </Link>
              )}
              {volunteer?.ctaLabel && (
                <Link to="/volunteer" className="btn border-2 border-white/50 text-white hover:bg-white/10">
                  <IconHands width={18} height={18} /> {volunteer.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
