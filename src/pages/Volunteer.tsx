import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getInvolvedOptions } from '../lib/contentful'
import { useSite } from '../lib/SiteContext'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import PageHero from '../components/ui/PageHero'
import { IconHands, IconHeart, IconMail } from '../components/ui/Icons'

export default function Volunteer() {
  const { settings } = useSite()
  const { data: options, loading, error } = useAsync(getInvolvedOptions, [])
  const [opened, setOpened] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' })

  if (error) return <ErrorState />
  if (loading || !options) return <Loader />

  const volunteer = options.find((o) => o.optionType === 'Volunteer')

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!settings.email) return
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterest: ${form.interest}\n\n${form.message}`,
    )
    const subject = encodeURIComponent('Volunteer enquiry — DOM Trust Foundation')
    window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Become a Volunteer"
        subtitle="Every contribution of time and skill helps us empower more lives and build sustainable communities."
      />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1.1fr]">
          <div>
            <h2 className="text-3xl">Join Us in Creating Change</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              {volunteer?.description ||
                'Share your time and skills. We match volunteers to roles that fit — from mentoring and health outreaches to talent coaching and community drives.'}
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Our approach focuses on listening to community needs, collaborating with local partners, and implementing
              lasting solutions that create generational change. Volunteers help us turn that approach into action
              across education, healthcare, livelihoods, and community support.
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              Whether you are an individual, a foundation, or a corporation, your support can create lasting change in
              our communities.
            </p>
            <Link to="/donate" className="btn-gold mt-8">
              <IconHeart width={18} height={18} /> Support Our Cause
            </Link>
          </div>

          <div className="rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
            {opened ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
                  <IconMail width={32} height={32} />
                </span>
                <h3 className="mt-6 text-2xl">Almost there!</h3>
                <p className="mt-3 max-w-sm text-ink/65">
                  We&apos;ve opened your email app with your volunteer enquiry ready. Please press
                  <span className="font-semibold text-ink"> Send </span>
                  to reach us{settings.email ? ` at ${settings.email}` : ''}.
                </p>
                <button onClick={() => setOpened(false)} className="btn-outline mt-6">
                  Back to the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                  <IconHands width={26} height={26} />
                </div>
                <h3 className="text-xl">Volunteer with us</h3>
                <label className="block">
                  <span className="form-label">Full name</span>
                  <input required value={form.name} onChange={update('name')} className="form-input" placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="form-label">Email</span>
                  <input required type="email" value={form.email} onChange={update('email')} className="form-input" placeholder="jane@email.com" />
                </label>
                <label className="block">
                  <span className="form-label">How would you like to help?</span>
                  <input
                    value={form.interest}
                    onChange={update('interest')}
                    className="form-input"
                    placeholder="Mentoring, outreach, skills training…"
                  />
                </label>
                <label className="block">
                  <span className="form-label">Message</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className="form-input resize-none"
                    placeholder="Tell us a little about yourself"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  {volunteer?.ctaLabel || 'Become a Volunteer'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
