import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getEvents, getInvolvedOptions } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { IconArrowRight, IconCalendar, IconHeart, IconPin, involvedIconMap } from '../components/ui/Icons'

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function isExternal(url?: string) {
  return !!url && /^https?:\/\//.test(url)
}

export default function GetInvolved() {
  const { data: options, loading, error } = useAsync(getInvolvedOptions, [])
  const { data: events } = useAsync(getEvents, [])

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Be part of the change"
        subtitle="Whether you give, serve, or partner — there's a place for you in this movement."
      />

      <section className="py-20">
        <div className="container-page">
          {error ? (
            <ErrorState />
          ) : loading || !options ? (
            <Loader />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2">
              {options.map((opt) => {
                const Icon = (opt.icon && involvedIconMap[opt.icon]) || IconHeart
                const href =
                  opt.optionType === 'Donate' ? '/donate' : opt.optionType === 'Volunteer' ? '/volunteer' : opt.ctaUrl
                const external = isExternal(href)
                return (
                  <div key={opt.id} className="card-lift flex flex-col rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                      <Icon width={26} height={26} />
                    </div>
                    <h3 className="mt-5 text-2xl">{opt.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink/70">{opt.description}</p>
                    {opt.ctaLabel &&
                      (external ? (
                        <a href={href} target="_blank" rel="noreferrer" className="btn-gold mt-6 self-start">
                          {opt.ctaLabel} <IconArrowRight width={16} height={16} />
                        </a>
                      ) : (
                        <Link to={href || '/contact'} className="btn-primary mt-6 self-start">
                          {opt.ctaLabel} <IconArrowRight width={16} height={16} />
                        </Link>
                      ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 bg-white py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Upcoming" title="Events & Community Drives" align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6">
            {(events || []).map((ev) => (
              <div
                key={ev.id}
                className="card-lift grid gap-6 overflow-hidden rounded-3xl border border-brand/10 bg-cream shadow-card sm:grid-cols-[220px_1fr]"
              >
                <div className="h-44 sm:h-full">
                  {ev.image ? (
                    <img src={ev.image.url} alt={ev.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-brand-gradient text-white">
                      <IconCalendar width={40} height={40} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide text-gold-dark">
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar width={14} height={14} /> {formatDate(ev.date)}
                    </span>
                    {ev.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <IconPin width={14} height={14} /> {ev.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl">{ev.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
