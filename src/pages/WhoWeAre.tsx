import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getAbout } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { IconBusiness, IconEducation, IconHands, IconHeart, IconScale, IconStar, IconUsers, valueIconMap } from '../components/ui/Icons'

const holisticItems = [
  {
    title: 'Safety & Compliance',
    description: 'Partnering with authorities to ensure riders are safe, visible, and legally compliant.',
    icon: IconScale,
  },
  {
    title: 'Financial Empowerment',
    description: 'Facilitating SACCO-based financing and training for motorbike ownership and maintenance.',
    icon: IconBusiness,
  },
  {
    title: 'Skills & Enterprise',
    description: 'Offering vocational training and mentorship to help riders transition into micro-enterprise.',
    icon: IconEducation,
  },
  {
    title: 'Policy & Legal Support',
    description: 'Engaging with policymakers and providing legal education to represent rider perspectives.',
    icon: IconUsers,
  },
]

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
        eyebrow="About"
        title="A Vision of Dignity, a Future of Purpose."
        subtitle="DOM Trust Foundation is dedicated to creating sustainable pathways out of poverty by empowering Kenya's youth to become catalysts for economic growth and social change."
        image={data.heroImage?.url}
      />

      {/* About */}
      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="About DOM Trust Foundation" title="A vision of dignity and purpose for all" />
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

      {/* Holistic approach — from the official About page */}
      <section className="bg-white py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Holistic Approach"
            title="We don't just provide aid; we build ecosystems of support"
            subtitle="We tackle the root causes of economic instability and danger in informal sectors, starting with Kenya's 1.5 million Boda Boda riders. By addressing the lack of training, credit access, and legal guidance, we aim to transform vulnerable jobs into viable careers."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {holisticItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="card-lift rounded-3xl border border-brand/10 bg-cream p-6 shadow-card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                    <Icon width={26} height={26} />
                  </div>
                  <h3 className="mt-5 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
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
      <section className="bg-cream py-20">
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

      <section className="container-page pb-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-8 py-14 text-center text-white shadow-soft sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-white sm:text-4xl">
            Join Us in Building a Better Future
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Whether you are an individual, a foundation, or a corporation, your support can create lasting change in
            our communities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/donate" className="btn bg-white text-brand-dark hover:bg-white/90">
              <IconHeart width={18} height={18} /> Donate Now
            </Link>
            <Link to="/volunteer" className="btn border-2 border-white/50 text-white hover:bg-white/10">
              <IconHands width={18} height={18} /> Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
