import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, FlaskConical, Music, Trophy } from 'lucide-react'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import NoticeCard from '../components/sections/NoticeCard'
import EventCard from '../components/sections/EventCard'
import FacultyCard from '../components/sections/FacultyCard'
import Loader from '../components/common/Loader'
import api from '../services/api'

const programmes = [
  { icon: BookOpen, title: 'CBSE curriculum', text: 'A structured academic path from Nursery to Class XII with regular assessments.' },
  { icon: FlaskConical, title: 'STEM labs', text: 'Physics, chemistry, biology and computer labs used weekly, not only for board years.' },
  { icon: Music, title: 'Arts & music', text: 'Choir, orchestra, theatre and visual arts with public performances each term.' },
  { icon: Trophy, title: 'Sport', text: 'Football, athletics, basketball and swimming with house competitions through the year.' },
]

export default function Home() {
  const [data, setData] = useState({ stats: {}, notices: [], events: [], faculty: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/public/stats'),
      api.get('/public/notices'),
      api.get('/public/events'),
      api.get('/public/faculty'),
    ])
      .then(([stats, notices, events, faculty]) => {
        setData({
          stats: stats.data,
          notices: notices.data.slice(0, 3),
          events: events.data.slice(0, 3),
          faculty: faculty.data.slice(0, 3),
        })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <>
        <Hero />
        <Loader label="Loading campus updates…" />
      </>
    )
  }

  return (
    <>
      <Hero />
      <Stats stats={data.stats} />
      <section className="container-site py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Why Greenwood</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-ink">A complete school day, not a collection of extras.</h2>
          <p className="mt-3 text-slate-600">
            Classes are small enough for teachers to know every student. Sport, labs and performing arts sit on the same timetable as mathematics and languages.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <item.icon className="text-accent" />
              <h3 className="mt-3 font-heading font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Notices</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink">What families need to know</h2>
            </div>
            <Link to="/events" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
              All notices <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {data.notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        </div>
      </section>
      <section className="container-site py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Calendar</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink">Upcoming events</h2>
          </div>
          <Link to="/events" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
            Full calendar <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {data.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Faculty</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink">Teachers who stay with a class</h2>
            </div>
            <Link to="/faculty" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
              Meet the team <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {data.faculty.map((teacher) => (
              <FacultyCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>
      <section className="container-site py-16">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 text-white sm:px-12">
          <h2 className="font-heading text-3xl font-bold">Admissions for 2026–27 are open</h2>
          <p className="mt-3 max-w-xl text-white/80">
            Submit an enquiry, visit campus on a working day, or write to the admissions office. Offers follow an interaction and a review of previous school records where required.
          </p>
          <Link to="/admissions" className="mt-6 inline-flex rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink hover:bg-accent-dark hover:text-white">
            Start an application
          </Link>
        </div>
      </section>
    </>
  )
}
