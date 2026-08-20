import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getPageCopy } from '../lib/contentful'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'

export default function NotFound() {
  const { data: page, loading, error } = useAsync(() => getPageCopy('not-found'), [])

  if (error) return <ErrorState />
  if (loading || !page) return <Loader />

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="bg-gold-gradient bg-clip-text font-heading text-7xl font-bold text-transparent">404</p>
      <h1 className="mt-4 text-3xl">{page.title}</h1>
      {page.subtitle && <p className="mt-3 max-w-md text-ink/60">{page.subtitle}</p>}
      {page.heading && (
        <Link to="/" className="btn-primary mt-8">
          {page.heading}
        </Link>
      )}
    </div>
  )
}
