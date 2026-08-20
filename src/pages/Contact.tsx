import { useState, type FormEvent } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getPageCopy } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconTiktok,
  IconGlobe,
} from '../components/ui/Icons'

export default function Contact() {
  const { settings } = useSite()
  const { data: page, loading, error } = useAsync(() => getPageCopy('contact'), [])
  const [opened, setOpened] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!settings.email) return
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    const subject = encodeURIComponent(form.subject || page?.title || '')
    window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  if (error) return <ErrorState />
  if (loading) return <Loader />
  if (!page?.title) return <ErrorState message="Contact page copy is missing in Contentful." />

  const backLabel = page.panelItems?.[0]

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} image={page.heroImage?.url} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
              {page.panelTitle && <h3 className="text-xl">{page.panelTitle}</h3>}
              <ul className="mt-6 space-y-5">
                {settings.email && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark">
                      <IconMail width={20} height={20} />
                    </span>
                    <div>
                      <a href={`mailto:${settings.email}`} className="font-heading font-semibold text-ink hover:text-brand-dark">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                )}
                {settings.phone && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark">
                      <IconPhone width={20} height={20} />
                    </span>
                    <div>
                      <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="font-heading font-semibold text-ink hover:text-brand-dark">
                        {settings.phone}
                      </a>
                    </div>
                  </li>
                )}
                {settings.website && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark">
                      <IconGlobe width={20} height={20} />
                    </span>
                    <div>
                      <span className="font-heading font-semibold text-ink">{settings.website}</span>
                    </div>
                  </li>
                )}
                {settings.address && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark">
                      <IconPin width={20} height={20} />
                    </span>
                    <div>
                      <span className="font-heading font-semibold text-ink">{settings.address}</span>
                    </div>
                  </li>
                )}
              </ul>

              <div className="mt-8 border-t border-brand/10 pt-6">
                <div className="mt-3 flex gap-3">
                  {settings.facebookUrl && (
                    <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="contact-social">
                      <IconFacebook width={18} height={18} />
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="contact-social">
                      <IconInstagram width={18} height={18} />
                    </a>
                  )}
                  {settings.tiktokUrl && (
                    <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok" className="contact-social">
                      <IconTiktok width={18} height={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
            {opened ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
                  <IconMail width={32} height={32} />
                </span>
                {page.panelBody && <h3 className="mt-6 text-2xl">{page.panelBody}</h3>}
                {page.body && (
                  <p className="mt-3 max-w-sm text-ink/65">
                    {page.body}
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
                {page.formTitle && page.formTitle !== page.heading && <h3 className="text-xl">{page.formTitle}</h3>}
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="form-label">Full name</span>
                    <input required value={form.name} onChange={update('name')} className="form-input" />
                  </label>
                  <label className="block">
                    <span className="form-label">Email</span>
                    <input required type="email" value={form.email} onChange={update('email')} className="form-input" />
                  </label>
                </div>
                <label className="block">
                  <span className="form-label">Subject</span>
                  <input value={form.subject} onChange={update('subject')} className="form-input" />
                </label>
                <label className="block">
                  <span className="form-label">Message</span>
                  <textarea required rows={5} value={form.message} onChange={update('message')} className="form-input resize-none" />
                </label>
                {page.heading && (
                  <button type="submit" className="btn-primary w-full">
                    {page.heading}
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
