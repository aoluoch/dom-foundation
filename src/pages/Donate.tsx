import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getInvolvedOptions } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconArrowRight, IconHands, IconHeart } from '../components/ui/Icons'

export default function Donate() {
  const { settings } = useSite()
  const { data: options, loading, error } = useAsync(getInvolvedOptions, [])

  if (error) return <ErrorState />
  if (loading || !options) return <Loader />

  const donate = options.find((o) => o.optionType === 'Donate')
  const donateUrl = settings.donateUrl || '#'
  const external = /^https?:\/\//.test(donateUrl)

  return (
    <>
      <PageHero
        eyebrow="Support Our Cause"
        title="Join Us in Creating Change"
        subtitle="Every contribution helps us empower more lives and build sustainable communities. Be part of the transformation today."
      />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl">Your support creates lasting change</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              {donate?.description ||
                'Whether you are an individual, a foundation, or a corporation, your support can create lasting change in our communities.'}
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              DOM Trust Foundation creates sustainable pathways out of poverty through community empowerment,
              education, and economic development. Gifts help us listen to community needs, collaborate with local
              partners, and implement lasting solutions that create generational change.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {external ? (
                <a href={donateUrl} target="_blank" rel="noreferrer" className="btn-gold">
                  <IconHeart width={18} height={18} /> Donate Now
                </a>
              ) : (
                <Link to={donateUrl} className="btn-gold">
                  <IconHeart width={18} height={18} /> Donate Now
                </Link>
              )}
              <Link to="/volunteer" className="btn-outline">
                <IconHands width={18} height={18} /> Become a Volunteer
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
            <h3 className="text-xl text-white">Join Us in Building a Better Future</h3>
            <p className="mt-4 leading-relaxed text-white/90">
              Whether you are an individual, a foundation, or a corporation, your support can create lasting change
              in our communities.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              <li>Empower Kenya’s youth as catalysts for economic growth and social change.</li>
              <li>Help street families reintegrate into society with dignity.</li>
              <li>Expand education, healthcare, and sustainable livelihoods.</li>
            </ul>
            <a href={donateUrl} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="btn mt-8 bg-white text-brand-dark hover:bg-white/90">
              Donate Now <IconArrowRight width={16} height={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
