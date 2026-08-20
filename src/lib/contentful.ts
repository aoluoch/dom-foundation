import { createClient, type Entry } from 'contentful'
import type {
  AboutContent,
  CoreValue,
  EventItem,
  GetInvolvedOption,
  HomeContent,
  ImageAsset,
  ImpactStory,
  Partner,
  ResourceItem,
  SiteSettings,
  StrategicPillar,
  TeamMember,
  WorkSection,
} from '../types/content'

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string | undefined
const environment = (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) || 'master'

export const isContentfulConfigured = Boolean(space && accessToken)

if (!isContentfulConfigured) {
  console.error(
    'Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN in web/.env',
  )
}

const client = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
  environment,
})

/* ---------------- mappers ---------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAsset(asset: any): ImageAsset | undefined {
  const file = asset?.fields?.file
  if (!file?.url) return undefined
  return {
    url: file.url.startsWith('//') ? `https:${file.url}` : file.url,
    title: asset?.fields?.title || '',
    width: file?.details?.image?.width,
    height: file?.details?.image?.height,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPillar(entry: Entry<any>): StrategicPillar {
  const f = entry.fields
  return {
    id: entry.sys.id,
    title: f.title as string,
    slug: f.slug as string,
    order: (f.order as number) ?? 99,
    icon: (f.icon as string) || 'impact',
    accentColor: f.accentColor as string,
    summary: f.summary as string,
    overview: f.overview as string,
    heroImage: mapAsset(f.heroImage),
    workSections: (f.workSections as unknown as WorkSection[]) || [],
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapValue(entry: Entry<any>): CoreValue {
  const f = entry.fields
  return {
    id: entry.sys.id,
    title: f.title as string,
    description: f.description as string,
    icon: f.icon as string,
    order: (f.order as number) ?? 99,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTeam(entry: Entry<any>): TeamMember {
  const f = entry.fields
  return {
    id: entry.sys.id,
    name: f.name as string,
    role: f.role as string,
    bio: f.bio as string,
    photo: mapAsset(f.photo),
    order: (f.order as number) ?? 99,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPartner(entry: Entry<any>): Partner {
  const f = entry.fields
  return {
    id: entry.sys.id,
    name: f.name as string,
    url: f.url as string,
    logo: mapAsset(f.logo),
    order: (f.order as number) ?? 99,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStory(entry: Entry<any>): ImpactStory {
  const f = entry.fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pillar = f.pillar as any
  return {
    id: entry.sys.id,
    title: f.title as string,
    slug: f.slug as string,
    location: f.location as string,
    summary: f.summary as string,
    body: f.body as string,
    quote: f.quote as string,
    author: f.author as string,
    featured: Boolean(f.featured),
    image: mapAsset(f.image),
    pillarTitle: pillar?.fields?.title,
    pillarSlug: pillar?.fields?.slug,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOption(entry: Entry<any>): GetInvolvedOption {
  const f = entry.fields
  return {
    id: entry.sys.id,
    title: f.title as string,
    optionType: f.optionType as string,
    description: f.description as string,
    ctaLabel: f.ctaLabel as string,
    ctaUrl: f.ctaUrl as string,
    icon: f.icon as string,
    order: (f.order as number) ?? 99,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResource(entry: Entry<any>): ResourceItem {
  const f = entry.fields
  return {
    id: entry.sys.id,
    title: f.title as string,
    category: f.category as string,
    description: f.description as string,
    fileUrl: mapAsset(f.file)?.url,
    order: (f.order as number) ?? 99,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(entry: Entry<any>): EventItem {
  const f = entry.fields
  return {
    id: entry.sys.id,
    title: f.title as string,
    date: f.date as string,
    location: f.location as string,
    description: f.description as string,
    image: mapAsset(f.image),
  }
}

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order

/* ---------------- queries ---------------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await client.getEntries({ content_type: 'siteSettings', limit: 1, include: 2 })
  const entry = res.items[0]
  if (!entry) throw new Error('No siteSettings entry found in Contentful')
  const f = entry.fields
  return {
    siteName: (f.siteName as string) || 'DOM Trust Foundation',
    tagline: f.tagline as string,
    logo: mapAsset(f.logo),
    email: f.email as string,
    phone: f.phone as string,
    website: f.website as string,
    address: f.address as string,
    facebookUrl: f.facebookUrl as string,
    instagramUrl: f.instagramUrl as string,
    tiktokUrl: f.tiktokUrl as string,
    donateUrl: f.donateUrl as string,
  }
}

export async function getPillars(): Promise<StrategicPillar[]> {
  const res = await client.getEntries({ content_type: 'strategicPillar', include: 2, limit: 50 })
  return res.items.map(mapPillar).sort(byOrder)
}

export async function getPillarBySlug(slug: string): Promise<StrategicPillar | undefined> {
  const res = await client.getEntries({
    content_type: 'strategicPillar',
    'fields.slug': slug,
    include: 2,
    limit: 1,
  })
  return res.items[0] ? mapPillar(res.items[0]) : undefined
}

export async function getHome(): Promise<HomeContent> {
  const res = await client.getEntries({ content_type: 'homePage', include: 3, limit: 1 })
  const entry = res.items[0]
  if (!entry) throw new Error('No homePage entry found in Contentful')
  const f = entry.fields
  return {
    heroTitle: f.heroTitle as string,
    heroSubtitle: f.heroSubtitle as string,
    heroImage: mapAsset(f.heroImage),
    introBlurb: f.introBlurb as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pillars: ((f.pillars as any[]) || []).filter((p) => p?.fields).map(mapPillar).sort(byOrder),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    featuredStory: (f.featuredStory as any)?.fields ? mapStory(f.featuredStory as Entry<any>) : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    partners: ((f.partners as any[]) || []).filter((p) => p?.fields).map(mapPartner).sort(byOrder),
  }
}

export async function getAbout(): Promise<AboutContent> {
  const res = await client.getEntries({ content_type: 'aboutPage', include: 3, limit: 1 })
  const entry = res.items[0]
  if (!entry) throw new Error('No aboutPage entry found in Contentful')
  const f = entry.fields
  return {
    about: f.about as string,
    vision: f.vision as string,
    mission: f.mission as string,
    history: f.history as string,
    heroImage: mapAsset(f.heroImage),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: ((f.values as any[]) || []).filter((v) => v?.fields).map(mapValue).sort(byOrder),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    team: ((f.team as any[]) || []).filter((t) => t?.fields).map(mapTeam).sort(byOrder),
  }
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const res = await client.getEntries({ content_type: 'impactStory', include: 2, limit: 50 })
  return res.items.map(mapStory)
}

export async function getImpactStoryBySlug(slug: string): Promise<ImpactStory | undefined> {
  const res = await client.getEntries({
    content_type: 'impactStory',
    'fields.slug': slug,
    include: 2,
    limit: 1,
  })
  return res.items[0] ? mapStory(res.items[0]) : undefined
}

export async function getInvolvedOptions(): Promise<GetInvolvedOption[]> {
  const res = await client.getEntries({ content_type: 'getInvolvedOption', limit: 50 })
  return res.items.map(mapOption).sort(byOrder)
}

export async function getResources(): Promise<ResourceItem[]> {
  const res = await client.getEntries({ content_type: 'resource', include: 1, limit: 100 })
  return res.items.map(mapResource).sort(byOrder)
}

export async function getEvents(): Promise<EventItem[]> {
  const res = await client.getEntries({ content_type: 'event', include: 1, limit: 50, order: ['fields.date'] })
  return res.items.map(mapEvent)
}
