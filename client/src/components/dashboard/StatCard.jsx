export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 font-heading text-2xl font-bold text-ink">{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
        </div>
        {Icon ? (
          <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon size={20} />
          </span>
        ) : null}
      </div>
    </div>
  )
}
