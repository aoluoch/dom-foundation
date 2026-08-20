import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSite } from '../../lib/SiteContext'
import { IconArrowRight } from '../ui/Icons'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Who We Are', to: '/who-we-are' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'Impact Stories', to: '/impact' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { settings, pillars } = useSite()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-card backdrop-blur' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <div className="container-page flex h-28 items-center justify-between gap-4">
        <Link to="/" className="flex items-center">
          {settings.logo && <img src={settings.logo.url} alt={settings.siteName} className="h-24 w-auto object-contain" />}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.to} className="group relative">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-heading font-semibold transition-colors ${
                    isActive ? 'text-brand-dark' : 'text-ink/70 hover:text-brand-dark'
                  }`
                }
              >
                {item.label}
              </NavLink>
              {item.to === '/our-work' && (
                <div className="invisible absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-brand/10 bg-white p-2 shadow-card">
                    {pillars.map((p) => (
                      <Link
                        key={p.id}
                        to={`/our-work/${p.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand-dark"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={settings.donateUrl || '#'} target="_blank" rel="noreferrer" className="btn-gold">
            Donate <IconArrowRight width={16} height={16} />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/20 text-brand-dark lg:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand/10 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base font-heading font-semibold ${
                    isActive ? 'bg-brand/10 text-brand-dark' : 'text-ink/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href={settings.donateUrl || '#'} target="_blank" rel="noreferrer" className="btn-gold mt-3">
              Donate <IconArrowRight width={16} height={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
