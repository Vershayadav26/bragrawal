export default function NoticeCard({ notice }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{notice.category}</p>
        {notice.pinned ? (
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">Pinned</span>
        ) : null}
      </div>
      <h3 className="mt-2 font-heading text-base font-semibold text-ink">{notice.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{notice.content}</p>
      <p className="mt-3 text-xs text-slate-400">
        {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </article>
  )
}
