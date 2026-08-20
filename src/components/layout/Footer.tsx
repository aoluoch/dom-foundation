import { Link } from 'react-router-dom'
import { useSite } from '../../lib/SiteContext'
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconPin, IconTiktok } from '../ui/Icons'

export default function Footer() {
  const { settings, pillars } = useSite()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {settings.logo && (
              <img src={settings.logo.url} alt={settings.siteName} className="h-12 w-12 rounded-full bg-white object-cover" />
            )}
            <div className="leading-tight">
              <p className="font-heading text-base font-bold text-white">DOM TRUST</p>
              <p className="font-heading text-[0.7rem] font-semibold tracking-[0.25em] text-gold-light">FOUNDATION</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{settings.tagline}</p>
          <div className="mt-6 flex gap-3">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn">
                <IconFacebook width={18} height={18} />
              </a>
            )}
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">
                <IconInstagram width={18} height={18} />
              </a>
            )}
            {settings.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok" className="social-btn">
                <IconTiktok width={18} height={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="footer-title">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="footer-link" to="/about">About</Link></li>
            <li><Link className="footer-link" to="/our-work">Our Work</Link></li>
            <li><Link className="footer-link" to="/impact">Impact Stories</Link></li>
            <li><Link className="footer-link" to="/donate">Donate</Link></li>
            <li><Link className="footer-link" to="/volunteer">Volunteer</Link></li>
            <li><Link className="footer-link" to="/get-involved">Get Involved</Link></li>
            <li><Link className="footer-link" to="/resources">Resources</Link></li>
            <li><Link className="footer-link" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Our Work</h4>
          <ul className="space-y-2.5 text-sm">
            {pillars.map((p) => (
              <li key={p.id}>
                <Link className="footer-link" to={`/our-work/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Get in Touch</h4>
          <ul className="space-y-3.5 text-sm">
            {settings.email && (
              <li className="flex items-start gap-3">
                <IconMail width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
                <a className="footer-link break-all" href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            )}
            {settings.phone && (
              <li className="flex items-start gap-3">
                <IconPhone width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
                <a className="footer-link" href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a>
              </li>
            )}
            {settings.address && (
              <li className="flex items-start gap-3">
                <IconPin width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {settings.siteName}. All rights reserved.</p>
          {settings.privacyNote && <p>{settings.privacyNote}</p>}
          <p>{settings.website}</p>
        </div>
      </div>
    </footer>
  )
}
