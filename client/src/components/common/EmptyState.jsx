export default function EmptyState({ title, hint, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <p className="font-heading text-lg font-semibold text-ink">{title}</p>
      {hint ? <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{hint}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
