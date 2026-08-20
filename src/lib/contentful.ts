import { createClient, type Entry } from 'contentful'
import type {
  AboutContent,
  CoreValue,
  EventItem,
  GetInvolvedOption,
  HomeContent,
  ImageAsset,
  ImpactStory,
  PageCopy,
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

function parseStats(copy?: PageCopy): Array<{ value: string; label: string }> {
  const lines = (copy?.body || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  return lines
    .map((line) => {
      const [value, ...rest] = line.split('|')
      return { value: value.trim(), label: rest.join('|').trim() }
    })
    .filter((stat) => stat.value && stat.label)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await client.getEntries({ content_type: 'siteSettings', limit: 1, include: 2 })
  const entry = res.items[0]
  if (!entry) throw new Error('No siteSettings entry found in Contentful')
  const f = entry.fields
  const [privacy, options] = await Promise.all([getPageCopy('privacy'), getInvolvedOptions()])
  const donateOpt = options.find((o) => o.optionType === 'Donate')
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
    privacyNote: (f.privacyNote as string) || privacy?.title,
    donateCtaLabel: donateOpt?.ctaLabel,
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
  const [pillarsCopy, partnersCopy, ctaCopy, workCopy, donateCopy, volunteerCopy, storyCopy, impactCopy, featuredCopy, statsCopy] =
    await Promise.all([
      getPageCopy('home-pillars'),
      getPageCopy('home-partners'),
      getPageCopy('home-cta'),
      getPageCopy('our-work'),
      getPageCopy('donate'),
      getPageCopy('volunteer'),
      getPageCopy('home-story'),
      getPageCopy('home-impact'),
      getPageCopy('home-featured'),
      getPageCopy('home-stats'),
    ])
  const options = await getInvolvedOptions()
  const donateOpt = options.find((o) => o.optionType === 'Donate')
  const volunteerOpt = options.find((o) => o.optionType === 'Volunteer')
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
    workCtaLabel: (f.workCtaLabel as string) || workCopy?.heading,
    donateCtaLabel: (f.donateCtaLabel as string) || donateCopy?.ctaLabel || donateOpt?.ctaLabel,
    volunteerCtaLabel: (f.volunteerCtaLabel as string) || volunteerCopy?.ctaLabel || volunteerOpt?.ctaLabel,
    storyCtaLabel: (f.storyCtaLabel as string) || storyCopy?.title,
    impactCtaLabel: (f.impactCtaLabel as string) || impactCopy?.title,
    pillarsEyebrow: (f.pillarsEyebrow as string) || pillarsCopy?.eyebrow,
    pillarsTitle: (f.pillarsTitle as string) || pillarsCopy?.title,
    pillarsSubtitle: (f.pillarsSubtitle as string) || pillarsCopy?.subtitle,
    partnersHeading: (f.partnersHeading as string) || partnersCopy?.title,
    partnersBlurb: (f.partnersBlurb as string) || partnersCopy?.subtitle,
    ctaTitle: (f.ctaTitle as string) || ctaCopy?.title,
    ctaBody: (f.ctaBody as string) || ctaCopy?.subtitle || ctaCopy?.body,
    featuredCtaLabel: (f.featuredCtaLabel as string) || featuredCopy?.title,
    stats: parseStats(statsCopy),
  }
}

export async function getAbout(): Promise<AboutContent> {
  const res = await client.getEntries({ content_type: 'aboutPage', include: 3, limit: 1 })
  const entry = res.items[0]
  if (!entry) throw new Error('No aboutPage entry found in Contentful')
  const f = entry.fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allValues = ((f.values as any[]) || []).filter((v) => v?.fields).map(mapValue).sort(byOrder)
  const heroValue = allValues.find((v) => v.order === 0)
  const joinValue = allValues.find((v) => v.order === 20)
  const [heroPage, joinPage, holisticPage, valuesPage, teamPage, labelsPage] = await Promise.all([
    getPageCopy('about'),
    getPageCopy('about-join'),
    getPageCopy('about-holistic'),
    getPageCopy('about-values'),
    getPageCopy('about-team'),
    getPageCopy('about-labels'),
  ])
  const fromField = Array.isArray(f.holisticItems)
    ? (f.holisticItems as Array<{ title: string; description?: string; icon?: string }>)
    : undefined
  const labels = splitParagraphs(labelsPage?.body)
  return {
    about: f.about as string,
    vision: f.vision as string,
    mission: f.mission as string,
    history: f.history as string,
    heroImage: mapAsset(f.heroImage) || heroPage?.heroImage,
    values: allValues.filter((v) => v.order > 0 && v.order < 10),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    team: ((f.team as any[]) || []).filter((t) => t?.fields).map(mapTeam).sort(byOrder),
    headline: (f.headline as string) || heroPage?.title || heroValue?.title,
    subtitle: (f.subtitle as string) || heroPage?.subtitle || heroValue?.description,
    sectionEyebrow: (f.sectionEyebrow as string) || heroPage?.eyebrow,
    sectionTitle: (f.sectionTitle as string) || heroPage?.heading,
    holisticEyebrow: (f.holisticEyebrow as string) || holisticPage?.eyebrow,
    holisticTitle: (f.holisticTitle as string) || holisticPage?.title,
    holisticIntro: (f.holisticIntro as string) || holisticPage?.subtitle,
    valuesEyebrow: (f.valuesEyebrow as string) || valuesPage?.eyebrow,
    valuesTitle: (f.valuesTitle as string) || valuesPage?.title,
    teamEyebrow: (f.teamEyebrow as string) || teamPage?.eyebrow,
    teamTitle: (f.teamTitle as string) || teamPage?.title,
    teamSubtitle: (f.teamSubtitle as string) || teamPage?.subtitle,
    joinTitle: (f.joinTitle as string) || joinPage?.title || joinValue?.title,
    joinBody: (f.joinBody as string) || joinPage?.subtitle || joinValue?.description,
    historyTitle: labels[0],
    visionTitle: labels[1],
    missionTitle: labels[2],
    holisticItems:
      fromField ||
      allValues.filter((v) => v.order >= 10 && v.order < 20).map((v) => ({
        title: v.title,
        description: v.description,
        icon: v.icon,
      })),
  }
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const res = await client.getEntries({ content_type: 'impactStory', include: 2, limit: 50 })
  return res.items.map(mapStory).filter((story) => !story.slug?.startsWith('page-'))
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

export function splitParagraphs(text?: string): string[] {
  if (!text) return []
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageCopyFromContentPage(entry: Entry<any>): PageCopy {
  const f = entry.fields
  const panelItems = f.panelItems
  return {
    slug: f.slug as string,
    eyebrow: f.eyebrow as string,
    title: f.title as string,
    subtitle: f.subtitle as string,
    heading: f.heading as string,
    body: f.body as string,
    ctaLabel: f.ctaLabel as string,
    ctaUrl: f.ctaUrl as string,
    secondaryCtaLabel: f.secondaryCtaLabel as string,
    secondaryCtaUrl: f.secondaryCtaUrl as string,
    panelTitle: f.panelTitle as string,
    panelBody: f.panelBody as string,
    panelItems: Array.isArray(panelItems) ? (panelItems as string[]) : undefined,
    formTitle: f.formTitle as string,
    heroImage: mapAsset(f.heroImage),
  }
}

// Page copy can live in a dedicated `contentPage` type, or as an Impact Story
// whose slug starts with `page-` (those stories are hidden from the Impact grid).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageCopyFromStory(entry: Entry<any>): PageCopy {
  const f = entry.fields
  const items = splitParagraphs(f.quote as string)
  return {
    slug: f.slug as string,
    eyebrow: f.location as string,
    title: f.title as string,
    subtitle: f.summary as string,
    heading: f.author as string,
    body: f.body as string,
    panelTitle: items[0],
    panelBody: items[1],
    panelItems: items.slice(2),
    formTitle: f.author as string,
    heroImage: mapAsset(f.image),
  }
}

export async function getPageCopy(slug: string): Promise<PageCopy | undefined> {
  try {
    const pages = await client.getEntries({
      content_type: 'contentPage',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    })
    if (pages.items[0]) return mapPageCopyFromContentPage(pages.items[0])
  } catch {
    // contentPage type may not exist yet — fall through to page-* impact stories
  }

  const stories = await client.getEntries({
    content_type: 'impactStory',
    'fields.slug': slug.startsWith('page-') ? slug : `page-${slug}`,
    include: 2,
    limit: 1,
  })
  return stories.items[0] ? mapPageCopyFromStory(stories.items[0]) : undefined
}
