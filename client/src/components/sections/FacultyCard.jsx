export default function FacultyCard({ teacher }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img src={teacher.photo} alt={teacher.user?.name} className="h-56 w-full object-cover" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{teacher.subject}</p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-ink">{teacher.user?.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{teacher.qualification}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{teacher.bio}</p>
        <p className="mt-3 text-xs font-medium text-slate-400">{teacher.experience} years at Greenwood</p>
      </div>
    </article>
  )
}
