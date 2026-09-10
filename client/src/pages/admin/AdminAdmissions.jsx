import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import DataTable from '../../components/dashboard/DataTable'
import api from '../../services/api'

export default function AdminAdmissions() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setRows((await api.get('/admin/admissions')).data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (row, status) => {
    await api.put(`/admin/admissions/${row.id}`, { status })
    toast.success(`Marked ${status.toLowerCase()}`)
    load()
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold text-ink">Admissions</h1>
      <Card className="p-4">
        <DataTable
          rows={rows}
          searchKeys={['studentName', 'parentName', 'email', 'applyingFor']}
          columns={[
            { key: 'studentName', label: 'Student' },
            { key: 'parentName', label: 'Parent' },
            { key: 'email', label: 'Email' },
            { key: 'applyingFor', label: 'Class' },
            { key: 'status', label: 'Status' },
          ]}
          actions={(row) => (
            <div className="flex flex-wrap gap-2">
              {['REVIEWED', 'ACCEPTED', 'REJECTED'].map((status) => (
                <Button key={status} variant="outline" className="px-2 py-1 text-xs" onClick={() => setStatus(row, status)}>
                  {status}
                </Button>
              ))}
              <Button
                variant="danger"
                className="px-2 py-1 text-xs"
                onClick={async () => {
                  await api.delete(`/admin/admissions/${row.id}`)
                  toast.success('Removed')
                  load()
                }}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </Card>
    </div>
  )
}
