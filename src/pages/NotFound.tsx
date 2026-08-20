import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="bg-gold-gradient bg-clip-text font-heading text-7xl font-bold text-transparent">404</p>
      <h1 className="mt-4 text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-ink/60">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}
