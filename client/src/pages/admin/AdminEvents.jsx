import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import DataTable from '../../components/dashboard/DataTable'
import CRUDModal from '../../components/dashboard/CRUDModal'
import api from '../../services/api'

const empty = { title: '', description: '', date: '', venue: '', image: '' }

export default function AdminEvents() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(empty)

  const load = useCallback(async () => {
    setRows((await api.get('/admin/events')).data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'venue', label: 'Venue' },
    { name: 'image', label: 'Image URL' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ]

  const save = async () => {
    setSaving(true)
    try {
      if (editing) await api.put(`/admin/events/${editing.id}`, values)
      else await api.post('/admin/events', values)
      toast.success('Event saved')
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
        <h1 className="font-heading text-2xl font-bold text-ink">Events</h1>
        <Button
          onClick={() => {
            setEditing(null)
            setValues(empty)
            setOpen(true)
          }}
        >
          Add event
        </Button>
      </div>
      <Card className="p-4">
        <DataTable
          rows={rows}
          searchKeys={['title', 'venue']}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'date', label: 'Date', render: (r) => new Date(r.date).toLocaleDateString('en-IN') },
            { key: 'venue', label: 'Venue' },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() => {
                  setEditing(row)
                  setValues({
                    title: row.title,
                    description: row.description,
                    date: row.date?.slice(0, 10),
                    venue: row.venue,
                    image: row.image,
                  })
                  setOpen(true)
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="px-3 py-1.5 text-xs"
                onClick={async () => {
                  await api.delete(`/admin/events/${row.id}`)
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
        title={editing ? 'Edit event' : 'Add event'}
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
