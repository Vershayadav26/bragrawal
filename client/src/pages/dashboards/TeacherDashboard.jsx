import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import Table from '../../components/common/Table'
import api from '../../services/api'

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null)
  const [students, setStudents] = useState([])
  const [timetable, setTimetable] = useState([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [marks, setMarks] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([api.get('/teachers/me'), api.get('/teachers/students'), api.get('/teachers/timetable')])
      .then(([p, s, t]) => {
        setProfile(p.data)
        setStudents(s.data)
        setTimetable(t.data)
        const initial = {}
        s.data.forEach((st) => {
          initial[st.id] = 'PRESENT'
        })
        setMarks(initial)
      })
      .finally(() => setLoading(false))
  }, [])

  const className = useMemo(() => {
    const ids = [...new Set(students.map((s) => `${s.class?.name} ${s.class?.section}`))]
    return ids.join(', ') || '—'
  }, [students])

  const save = async () => {
    setSaving(true)
    try {
      await api.post('/teachers/attendance', {
        date,
        records: Object.entries(marks).map(([studentId, status]) => ({ studentId, status })),
      })
      toast.success('Attendance saved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save attendance')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Teacher dashboard</h1>
        <p className="text-sm text-slate-500">
          {profile?.user?.name} · {profile?.subject} · {className}
        </p>
      </div>
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">Mark attendance</h2>
            <p className="text-sm text-slate-500">Select a date and set each student’s status.</p>
          </div>
          <label className="text-sm">
            <span className="label">Date</span>
            <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="py-3">Student</th>
                <th>Class</th>
                <th>Roll</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium">{st.user?.name}</td>
                  <td>{st.class?.name} {st.class?.section}</td>
                  <td>{st.rollNumber}</td>
                  <td>
                    <select
                      className="input max-w-[9rem]"
                      value={marks[st.id]}
                      onChange={(e) => setMarks((m) => ({ ...m, [st.id]: e.target.value }))}
                    >
                      <option>PRESENT</option>
                      <option>LATE</option>
                      <option>ABSENT</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button className="mt-4" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save attendance'}
        </Button>
      </Card>
      <Card className="p-0">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold">My timetable</h2>
        </div>
        <Table
          rows={timetable}
          columns={[
            { key: 'day', label: 'Day' },
            { key: 'period', label: 'Period' },
            { key: 'subject', label: 'Subject' },
            { key: 'class', label: 'Class', render: (r) => `${r.class?.name} ${r.class?.section}` },
            { key: 'time', label: 'Time', render: (r) => `${r.startTime}–${r.endTime}` },
          ]}
        />
      </Card>
    </div>
  )
}
