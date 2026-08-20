export interface ImageAsset {
  url: string
  title: string
  width?: number
  height?: number
}

export interface WorkSection {
  title: string
  description?: string
  items?: string[]
}

export interface StrategicPillar {
  id: string
  title: string
  slug: string
  order: number
  icon: string
  accentColor?: string
  summary?: string
  overview?: string
  heroImage?: ImageAsset
  workSections?: WorkSection[]
}

export interface CoreValue {
  id: string
  title: string
  description?: string
  icon?: string
  order: number
}

export interface TeamMember {
  id: string
  name: string
  role?: string
  bio?: string
  photo?: ImageAsset
  order: number
}

export interface Partner {
  id: string
  name: string
  url?: string
  logo?: ImageAsset
  order: number
}

export interface ImpactStory {
  id: string
  title: string
  slug: string
  location?: string
  summary?: string
  body?: string
  quote?: string
  author?: string
  featured?: boolean
  image?: ImageAsset
  pillarTitle?: string
  pillarSlug?: string
}

export interface GetInvolvedOption {
  id: string
  title: string
  optionType?: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
  icon?: string
  order: number
}

export interface ResourceItem {
  id: string
  title: string
  category?: string
  description?: string
  fileUrl?: string
  order: number
}

export interface EventItem {
  id: string
  title: string
  date?: string
  location?: string
  description?: string
  image?: ImageAsset
}

export interface SiteSettings {
  siteName: string
  tagline?: string
  logo?: ImageAsset
  email?: string
  phone?: string
  website?: string
  address?: string
  facebookUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
  donateUrl?: string
}

export interface HomeContent {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: ImageAsset
  introBlurb?: string
  pillars: StrategicPillar[]
  featuredStory?: ImpactStory
  partners: Partner[]
}

export interface AboutContent {
  about?: string
  vision?: string
  mission?: string
  history?: string
  heroImage?: ImageAsset
  values: CoreValue[]
  team: TeamMember[]
}
