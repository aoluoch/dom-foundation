export default function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-brand-dark">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-ink/50">{label}</p>
    </div>
  )
}
