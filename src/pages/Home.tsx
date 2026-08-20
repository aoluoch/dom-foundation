import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getHome } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import SectionHeading from '../components/ui/SectionHeading'
import PillarCard from '../components/ui/PillarCard'
import { IconArrowRight, IconHands, IconHeart, IconStar } from '../components/ui/Icons'

const stats = [
  { value: '10+', label: 'Years of service' },
  { value: '6', label: 'Strategic pillars' },
  { value: '2', label: 'Countries: Kenya & Ghana' },
  { value: '1000s', label: 'Lives touched' },
]

export default function Home() {
  const { settings } = useSite()
  const { data, loading, error } = useAsync(getHome, [])

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        {data.heroImage && (
          <img src={data.heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-brand-forest/70" />
        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="animate-fade-up lg:col-span-7">
            <span className="eyebrow mb-5 text-brand-lime">
              <span className="h-px w-8 bg-current" /> DOM Trust Foundation
            </span>
            <h1 className="text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">{data.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{data.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/our-work" className="btn-gold">
                Discover Our Work <IconArrowRight width={16} height={16} />
              </Link>
              <Link to="/donate" className="btn bg-white text-brand-dark hover:bg-white/90">
                <IconHeart width={18} height={18} /> Support Our Cause
              </Link>
              <Link to="/volunteer" className="btn border-2 border-white/40 text-white hover:bg-white/10">
                <IconHands width={18} height={18} /> Become a Volunteer
              </Link>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative ml-auto max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-soft">
                {data.heroImage && <img src={data.heroImage.url} alt={data.heroImage.title} className="h-[26rem] w-full object-cover" />}
              </div>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
                {settings.logo && <img src={settings.logo.url} alt="" className="h-12 w-12 rounded-full object-cover" />}
                <div className="pr-2">
                  <p className="font-heading text-sm font-bold text-brand-dark">Since inception</p>
                  <p className="text-xs text-ink/60">Serving the vulnerable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro blurb */}
      <section className="border-b border-brand/10 bg-white">
        <div className="container-page grid items-center gap-8 py-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-xl font-heading font-semibold leading-relaxed text-ink sm:text-2xl">{data.introBlurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="btn-outline">
                Our Story
              </Link>
              <Link to="/impact" className="btn-primary">
                See Impact
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="bg-gold-gradient bg-clip-text font-heading text-3xl font-bold text-transparent">{s.value}</p>
                <p className="mt-1 text-sm text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Core Pillars"
            title="The foundational areas that guide our work"
            subtitle="Dedicated action that creates lasting impact — from street family reintegration and education to healthcare, enterprise, climate solutions, and the arts."
            align="center"
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {data.pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      {data.featuredStory && (
        <section className="bg-brand-forest py-20 text-white">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="eyebrow mb-4 text-brand-lime">
                <span className="h-px w-6 bg-current" /> Featured Impact Story
              </span>
              <h2 className="text-3xl leading-tight text-white sm:text-4xl">{data.featuredStory.title}</h2>
              {data.featuredStory.quote && (
                <blockquote className="mt-6 border-l-4 border-gold pl-5 text-lg italic leading-relaxed text-white/85">
                  “{data.featuredStory.quote}”
                </blockquote>
              )}
              {data.featuredStory.author && (
                <p className="mt-4 font-heading text-sm font-semibold text-gold-light">— {data.featuredStory.author}</p>
              )}
              <Link to={`/impact/${data.featuredStory.slug}`} className="btn-gold mt-8">
                Read the story <IconArrowRight width={16} height={16} />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              {data.featuredStory.image && (
                <img
                  src={data.featuredStory.image.url}
                  alt={data.featuredStory.title}
                  className="h-80 w-full rounded-[2rem] object-cover shadow-soft"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {data.partners.length > 0 && (
        <section className="py-16">
          <div className="container-page text-center">
            <p className="eyebrow justify-center text-gold-dark">Our Valued Partners</p>
            <p className="mx-auto mt-3 max-w-xl text-ink/65">
              Collaborating for greater impact. We are proud to work with organizations that share our vision.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {data.partners.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-white px-7 py-5 shadow-card"
                >
                  {p.logo ? (
                    <img src={p.logo.url} alt={p.name} className="h-10 w-auto object-contain" />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                      <IconStar width={20} height={20} />
                    </span>
                  )}
                  <span className="font-heading text-lg font-semibold text-ink">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-page pb-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-8 py-14 text-center text-white shadow-soft sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-white sm:text-4xl">
            Join Us in Creating Change
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Every contribution helps us empower more lives and build sustainable communities. Be part of the
            transformation today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/donate" className="btn bg-white text-brand-dark hover:bg-white/90">
              Donate Now
            </Link>
            <Link to="/volunteer" className="btn border-2 border-white/50 text-white hover:bg-white/10">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
