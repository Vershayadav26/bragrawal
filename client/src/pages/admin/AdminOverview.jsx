import { useEffect, useState } from 'react'
import { Bell, Calendar, GraduationCap, Inbox, Users } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import Table from '../../components/common/Table'
import api from '../../services/api'

export default function AdminOverview() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/admin/overview').then((res) => setData(res.data))
  }, [])

  if (!data) return <Loader />

  const { stats, recentAdmissions } = data
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Admin overview</h1>
        <p className="text-sm text-slate-500">Students, staff, notices, events and admission enquiries.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Students" value={stats.students} icon={GraduationCap} />
        <StatCard label="Teachers" value={stats.teachers} icon={Users} />
        <StatCard label="Notices" value={stats.notices} icon={Bell} />
        <StatCard label="Events" value={stats.events} icon={Calendar} />
        <StatCard label="Admissions" value={stats.admissions} icon={Inbox} />
        <StatCard label="Pending enquiries" value={stats.pending} hint="Need a decision" icon={Inbox} />
      </div>
      <Card className="p-0">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold">Latest admission enquiries</h2>
        </div>
        <Table
          rows={recentAdmissions}
          columns={[
            { key: 'studentName', label: 'Student' },
            { key: 'applyingFor', label: 'Class' },
            { key: 'parentName', label: 'Parent' },
            {
              key: 'status',
              label: 'Status',
              render: (r) => <span className="text-xs font-semibold">{r.status}</span>,
            },
          ]}
        />
      </Card>
    </div>
  )
}
