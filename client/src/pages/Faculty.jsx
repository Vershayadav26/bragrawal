import { useEffect, useMemo, useState } from 'react'
import FacultyCard from '../components/sections/FacultyCard'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import api from '../services/api'

export default function Faculty() {
  const [teachers, setTeachers] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/faculty').then((res) => setTeachers(res.data)).finally(() => setLoading(false))
  }, [])

  const subjects = useMemo(() => ['All', ...new Set(teachers.map((t) => t.subject))], [teachers])
  const visible = filter === 'All' ? teachers : teachers.filter((t) => t.subject === filter)

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Faculty</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">Subject specialists who also tutor a class.</h1>
        </div>
      </section>
      <section className="container-site py-16">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === s ? 'bg-primary text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {visible.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((teacher) => (
                  <FacultyCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            ) : (
              <EmptyState title="No faculty in this department" />
            )}
          </>
        )}
      </section>
    </>
  )
}
