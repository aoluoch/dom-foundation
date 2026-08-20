import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getInvolvedOptions, getPageCopy, splitParagraphs } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconArrowRight, IconHands, IconHeart } from '../components/ui/Icons'

function isExternal(url?: string) {
  return !!url && /^https?:\/\//.test(url)
}

async function loadDonate() {
  const [page, options] = await Promise.all([getPageCopy('donate'), getInvolvedOptions()])
  return { page, donate: options.find((o) => o.optionType === 'Donate'), volunteer: options.find((o) => o.optionType === 'Volunteer') }
}

export default function Donate() {
  const { settings } = useSite()
  const { data, loading, error } = useAsync(loadDonate, [])

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />

  const { page, donate, volunteer } = data
  const title = page?.title || donate?.title
  const subtitle = page?.subtitle || donate?.description
  const heading = page?.heading || title
  const bodyParagraphs = splitParagraphs(page?.body || donate?.description)
  const donateUrl = page?.ctaUrl || settings.donateUrl || donate?.ctaUrl || '#'
  const donateLabel = page?.ctaLabel || donate?.ctaLabel
  const volunteerLabel = page?.secondaryCtaLabel || volunteer?.ctaLabel
  const volunteerUrl = page?.secondaryCtaUrl || '/volunteer'
  const panelTitle = page?.panelTitle
  const panelBody = page?.panelBody
  const panelItems = page?.panelItems || []

  if (!title) return <ErrorState message="Donate page copy is missing in Contentful." />

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={title} subtitle={subtitle} image={page?.heroImage?.url} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {heading && <h2 className="text-3xl">{heading}</h2>}
            <div className={heading ? 'mt-5' : ''}>
              {bodyParagraphs.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink/75 first:mt-0">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {donateLabel &&
                (isExternal(donateUrl) ? (
                  <a href={donateUrl} target="_blank" rel="noreferrer" className="btn-gold">
                    <IconHeart width={18} height={18} /> {donateLabel}
                  </a>
                ) : (
                  <Link to={donateUrl} className="btn-gold">
                    <IconHeart width={18} height={18} /> {donateLabel}
                  </Link>
                ))}
              {volunteerLabel && (
                <Link to={volunteerUrl} className="btn-outline">
                  <IconHands width={18} height={18} /> {volunteerLabel}
                </Link>
              )}
            </div>
          </div>

          {(panelTitle || panelBody || panelItems.length > 0) && (
            <div className="rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
              {panelTitle && <h3 className="text-xl text-white">{panelTitle}</h3>}
              {panelBody && <p className="mt-4 leading-relaxed text-white/90">{panelBody}</p>}
              {panelItems.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm text-white/85">
                  {panelItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {donateLabel && (
                <a
                  href={donateUrl}
                  target={isExternal(donateUrl) ? '_blank' : undefined}
                  rel={isExternal(donateUrl) ? 'noreferrer' : undefined}
                  className="btn mt-8 bg-white text-brand-dark hover:bg-white/90"
                >
                  {donateLabel} <IconArrowRight width={16} height={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
