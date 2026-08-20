import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getInvolvedOptions, getPageCopy, splitParagraphs } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconHands, IconHeart, IconMail } from '../components/ui/Icons'

async function loadVolunteer() {
  const [page, options] = await Promise.all([getPageCopy('volunteer'), getInvolvedOptions()])
  return { page, volunteer: options.find((o) => o.optionType === 'Volunteer'), donate: options.find((o) => o.optionType === 'Donate') }
}

export default function Volunteer() {
  const { settings } = useSite()
  const { data, loading, error } = useAsync(loadVolunteer, [])
  const [opened, setOpened] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' })

  if (error) return <ErrorState />
  if (loading || !data) return <Loader />

  const { page, volunteer, donate } = data
  const title = page?.title || volunteer?.title
  const subtitle = page?.subtitle
  const heading = page?.heading || title
  const bodyParagraphs = splitParagraphs(page?.body || volunteer?.description)
  const donateLabel = page?.secondaryCtaLabel || donate?.ctaLabel
  const donateUrl = page?.secondaryCtaUrl || '/donate'
  const formTitle = page?.formTitle || volunteer?.title
  const submitLabel = page?.ctaLabel || volunteer?.ctaLabel
  const backLabel = page?.panelItems?.[0]

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!settings.email) return
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterest: ${form.interest}\n\n${form.message}`,
    )
    const subject = encodeURIComponent(page?.title || 'Volunteer enquiry')
    window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  if (!title) return <ErrorState message="Volunteer page copy is missing in Contentful." />

  return (
    <>
      <PageHero eyebrow={page?.eyebrow} title={title} subtitle={subtitle} image={page?.heroImage?.url} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1.1fr]">
          <div>
            {heading && <h2 className="text-3xl">{heading}</h2>}
            {bodyParagraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-ink/75 first:mt-5">
                {p}
              </p>
            ))}
            {donateLabel && (
              <Link to={donateUrl} className="btn-gold mt-8">
                <IconHeart width={18} height={18} /> {donateLabel}
              </Link>
            )}
          </div>

          <div className="rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
            {opened ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
                  <IconMail width={32} height={32} />
                </span>
                <h3 className="mt-6 text-2xl">{page?.panelTitle}</h3>
                {page?.panelBody && (
                  <p className="mt-3 max-w-sm text-ink/65">
                    {page.panelBody}
                    {settings.email ? ` ${settings.email}` : ''}
                  </p>
                )}
                {backLabel && (
                  <button onClick={() => setOpened(false)} className="btn-outline mt-6">
                    {backLabel}
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                  <IconHands width={26} height={26} />
                </div>
                {formTitle && <h3 className="text-xl">{formTitle}</h3>}
                <label className="block">
                  <span className="form-label">Full name</span>
                  <input required value={form.name} onChange={update('name')} className="form-input" />
                </label>
                <label className="block">
                  <span className="form-label">Email</span>
                  <input required type="email" value={form.email} onChange={update('email')} className="form-input" />
                </label>
                <label className="block">
                  <span className="form-label">How would you like to help?</span>
                  <input value={form.interest} onChange={update('interest')} className="form-input" />
                </label>
                <label className="block">
                  <span className="form-label">Message</span>
                  <textarea required rows={4} value={form.message} onChange={update('message')} className="form-input resize-none" />
                </label>
                {submitLabel && (
                  <button type="submit" className="btn-primary w-full">
                    {submitLabel}
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
