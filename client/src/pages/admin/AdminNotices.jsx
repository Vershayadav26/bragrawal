import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import DataTable from '../../components/dashboard/DataTable'
import CRUDModal from '../../components/dashboard/CRUDModal'
import api from '../../services/api'

const empty = { title: '', content: '', category: 'General', pinned: false }

export default function AdminNotices() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(empty)

  const load = useCallback(async () => {
    setRows((await api.get('/admin/notices')).data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'category', label: 'Category' },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    {
      name: 'pinned',
      label: 'Pinned',
      type: 'select',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
  ]

  const save = async () => {
    setSaving(true)
    const payload = { ...values, pinned: values.pinned === true || values.pinned === 'true' }
    try {
      if (editing) await api.put(`/admin/notices/${editing.id}`, payload)
      else await api.post('/admin/notices', payload)
      toast.success('Notice saved')
      setOpen(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-ink">Notices</h1>
        <Button
          onClick={() => {
            setEditing(null)
            setValues(empty)
            setOpen(true)
          }}
        >
          Add notice
        </Button>
      </div>
      <Card className="p-4">
        <DataTable
          rows={rows}
          searchKeys={['title', 'category']}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'pinned', label: 'Pinned', render: (r) => (r.pinned ? 'Yes' : 'No') },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() => {
                  setEditing(row)
                  setValues({ ...row, pinned: String(row.pinned) })
                  setOpen(true)
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="px-3 py-1.5 text-xs"
                onClick={async () => {
                  await api.delete(`/admin/notices/${row.id}`)
                  toast.success('Deleted')
                  load()
                }}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </Card>
      <CRUDModal
        open={open}
        title={editing ? 'Edit notice' : 'Add notice'}
        fields={fields}
        values={values}
        onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))}
        onClose={() => setOpen(false)}
        onSubmit={save}
        saving={saving}
      />
    </div>
  )
}
