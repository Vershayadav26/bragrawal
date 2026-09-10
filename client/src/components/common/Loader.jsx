export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-slate-500">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
