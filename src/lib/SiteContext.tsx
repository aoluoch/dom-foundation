import { createContext, useContext, type ReactNode } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getPillars, getSiteSettings } from './contentful'
import type { SiteSettings, StrategicPillar } from '../types/content'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'

interface SiteData {
  settings: SiteSettings
  pillars: StrategicPillar[]
}

const SiteContext = createContext<SiteData | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const settings = useAsync(getSiteSettings, [])
  const pillars = useAsync(getPillars, [])

  if (settings.loading || pillars.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (settings.error || pillars.error || !settings.data || !pillars.data) {
    return (
      <ErrorState
        fullScreen
        title="Unable to load the site"
        message="We couldn't reach Contentful. Check that the Contentful space ID and delivery access token are set correctly in web/.env, then reload."
      />
    )
  }

  const value: SiteData = { settings: settings.data, pillars: pillars.data }

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite(): SiteData {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within a SiteProvider')
  return ctx
}
