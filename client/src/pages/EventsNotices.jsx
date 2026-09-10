import { useEffect, useState } from 'react'
import EventCard from '../components/sections/EventCard'
import NoticeCard from '../components/sections/NoticeCard'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import api from '../services/api'

export default function EventsNotices() {
  const [tab, setTab] = useState('notices')
  const [notices, setNotices] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get('/public/notices'), api.get('/public/events')])
      .then(([n, e]) => {
        setNotices(n.data)
        setEvents(e.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Campus news</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">Events and notices</h1>
        </div>
      </section>
      <section className="container-site py-16">
        <div className="mb-8 inline-flex rounded-xl bg-white p-1 ring-1 ring-slate-200">
          {['notices', 'events'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${tab === id ? 'bg-primary text-white' : 'text-slate-600'}`}
            >
              {id}
            </button>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : tab === 'notices' ? (
          notices.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {notices.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          ) : (
            <EmptyState title="No notices posted" />
          )
        ) : events.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <EmptyState title="No upcoming events" />
        )}
      </section>
    </>
  )
}
