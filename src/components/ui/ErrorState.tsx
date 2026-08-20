interface ErrorStateProps {
  title?: string
  message?: string
  fullScreen?: boolean
}

export default function ErrorState({
  title = 'Content unavailable',
  message = "We couldn't load this content from Contentful. Please try again shortly.",
  fullScreen = false,
}: ErrorStateProps) {
  return (
    <div className={`container-page flex flex-col items-center justify-center text-center ${fullScreen ? 'min-h-screen' : 'min-h-[50vh] py-20'}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold-dark">
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
      </div>
      <h2 className="mt-5 text-2xl">{title}</h2>
      <p className="mt-3 max-w-md text-ink/60">{message}</p>
    </div>
  )
}
