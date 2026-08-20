import type { SVGProps } from 'react'
import type React from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const IconRehabilitation = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="5" r="2.4" />
    <path d="M12 7.4V15" />
    <path d="M12 10l-4 2M12 10l4 2" />
    <path d="M9 21l3-6 3 6" />
  </svg>
)

export const IconEducation = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4L2.5 8.5 12 13l9.5-4.5L12 4z" />
    <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M21.5 8.5V14" />
  </svg>
)

export const IconMedical = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 8.5a4.3 4.3 0 0 0-7.4-3A4.3 4.3 0 0 0 4 8.5c0 4.6 8 11 8 11s8-6.4 8-11z" />
    <path d="M12 8v5M9.5 10.5h5" />
  </svg>
)

export const IconBusiness = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
)

export const IconArts = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </svg>
)

export const IconClimate = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9z" />
    <path d="M12 21v-6M12 15c-1.4 0-2.5-1-2.5-2.4" />
  </svg>
)

export const IconHeart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 8.5a4.3 4.3 0 0 0-7.4-3A4.3 4.3 0 0 0 4 8.5c0 4.6 8 11 8 11s8-6.4 8-11z" />
  </svg>
)

export const IconHands = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11l3-3 3 3v6H4z" />
    <path d="M14 17v-6l3-3 3 3v6" />
    <path d="M10 14h4" />
  </svg>
)

export const IconHandshake = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 12l4-4 4 2 2-2 4 1 4 3" />
    <path d="M6 8l-4 4 3 3 2-2" />
    <path d="M18 9l4 3-3 3-4-3" />
  </svg>
)

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </svg>
)

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
  </svg>
)

export const IconStar = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17.8 6.4 20.3l1.2-6.2L3 9.8l6.3-.8L12 3z" />
  </svg>
)

export const IconScale = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v18M7 21h10" />
    <path d="M12 6l-5 2 2.5 5a2.5 2.5 0 0 1-5 0L7 8M12 6l5 2-2.5 5a2.5 2.5 0 0 0 5 0L17 8" />
  </svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
)

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const IconPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconDownload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v12M7 11l5 4 5-4" />
    <path d="M4 20h16" />
  </svg>
)

export const IconFacebook = (p: IconProps) => (
  <svg {...base(p)} strokeWidth={0} fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
  </svg>
)

export const IconInstagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

export const IconTiktok = (p: IconProps) => (
  <svg {...base(p)} strokeWidth={0} fill="currentColor">
    <path d="M16 3c.3 2.1 1.5 3.7 3.6 4v2.5c-1.3 0-2.6-.4-3.6-1.1v6.1a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.7a3.1 3.1 0 1 0 2.2 3V3H16z" />
  </svg>
)

export const pillarIconMap: Record<string, (p: IconProps) => React.ReactElement> = {
  rehabilitation: IconRehabilitation,
  education: IconEducation,
  medical: IconMedical,
  business: IconBusiness,
  arts: IconArts,
  climate: IconClimate,
}

export const valueIconMap: Record<string, (p: IconProps) => React.ReactElement> = {
  collaborate: IconUsers,
  empathy: IconHeart,
  integrity: IconScale,
  diversity: IconGlobe,
  impact: IconStar,
}

export const involvedIconMap: Record<string, (p: IconProps) => React.ReactElement> = {
  donate: IconHeart,
  volunteer: IconHands,
  partner: IconHandshake,
  events: IconCalendar,
}
