import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, ClipboardList, GraduationCap, User } from 'lucide-react'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import Table from '../../components/common/Table'
import StatCard from '../../components/dashboard/StatCard'
import api from '../../services/api'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null)
  const [timetable, setTimetable] = useState([])
  const [attendance, setAttendance] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/students/me'),
      api.get('/students/timetable'),
      api.get('/students/attendance'),
      api.get('/students/results'),
    ])
      .then(([p, t, a, r]) => {
        setProfile(p.data)
        setTimetable(t.data)
        setAttendance(a.data)
        setResults(r.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const byDay = useMemo(() => {
    const map = Object.fromEntries(days.map((d) => [d, []]))
    timetable.forEach((row) => {
      map[row.day]?.push(row)
    })
    return map
  }, [timetable])

  if (loading) return <Loader />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Student dashboard</h1>
        <p className="text-sm text-slate-500">
          {profile?.user?.name} · {profile?.class?.name} {profile?.class?.section} · Roll {profile?.rollNumber}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance" value={`${attendance?.summary?.percent ?? 0}%`} hint={`${attendance?.summary?.present ?? 0} present`} icon={CalendarCheck} />
        <StatCard label="Absences" value={attendance?.summary?.absent ?? 0} icon={ClipboardList} />
        <StatCard label="Results logged" value={results.length} icon={GraduationCap} />
        <StatCard label="Class" value={`${profile?.class?.name} ${profile?.class?.section}`} icon={User} />
      </div>
      <Card className="p-6">
        <h2 className="font-heading text-lg font-semibold">Profile</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-slate-500">Parent</dt><dd className="font-medium">{profile?.parentName}</dd></div>
          <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{profile?.phone}</dd></div>
          <div><dt className="text-slate-500">Date of birth</dt><dd className="font-medium">{profile?.dob}</dd></div>
          <div><dt className="text-slate-500">Address</dt><dd className="font-medium">{profile?.address}</dd></div>
        </dl>
      </Card>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold">Weekly timetable</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Period</th>
                {days.map((d) => (
                  <th key={d} className="px-4 py-3">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((period) => (
                <tr key={period} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-500">{period}</td>
                  {days.map((day) => {
                    const slot = byDay[day]?.find((r) => r.period === period)
                    return (
                      <td key={day} className="px-4 py-3">
                        {slot ? (
                          <div>
                            <p className="font-medium text-ink">{slot.subject}</p>
                            <p className="text-xs text-slate-400">{slot.startTime}–{slot.endTime}</p>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-0">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-heading text-lg font-semibold">Recent attendance</h2>
          </div>
          <Table
            rows={attendance?.records?.slice(0, 12) || []}
            columns={[
              { key: 'date', label: 'Date' },
              {
                key: 'status',
                label: 'Status',
                render: (row) => (
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${row.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-700' : row.status === 'LATE' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                    {row.status}
                  </span>
                ),
              },
            ]}
          />
        </Card>
        <Card className="p-0">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-heading text-lg font-semibold">Results</h2>
          </div>
          <Table
            rows={results}
            columns={[
              { key: 'subject', label: 'Subject' },
              { key: 'examType', label: 'Exam' },
              { key: 'marks', label: 'Marks', render: (r) => `${r.marks}/${r.maxMarks}` },
              { key: 'grade', label: 'Grade' },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}
