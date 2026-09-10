import { Calendar, MapPin } from 'lucide-react'

export default function EventCard({ event }) {
  const date = new Date(event.date)
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img src={event.image} alt="" className="h-44 w-full object-cover" />
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-ink">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{event.description}</p>
        <div className="mt-4 flex flex-col gap-1 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <Calendar size={14} /> {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} /> {event.venue}
          </span>
        </div>
      </div>
    </article>
  )
}
