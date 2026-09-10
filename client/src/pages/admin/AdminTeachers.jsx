import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import DataTable from '../../components/dashboard/DataTable'
import CRUDModal from '../../components/dashboard/CRUDModal'
import api from '../../services/api'

const empty = {
  name: '',
  email: '',
  password: 'Teacher@123',
  subject: '',
  qualification: '',
  experience: 0,
  bio: '',
  photo: '',
  phone: '',
}

export default function AdminTeachers() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(empty)

  const load = useCallback(async () => {
    const { data } = await api.get('/admin/teachers')
    setRows(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    ...(!editing ? [{ name: 'password', label: 'Password' }] : []),
    { name: 'subject', label: 'Subject', required: true },
    { name: 'qualification', label: 'Qualification' },
    { name: 'experience', label: 'Experience (years)', type: 'number' },
    { name: 'phone', label: 'Phone' },
    { name: 'photo', label: 'Photo URL' },
    { name: 'bio', label: 'Bio', type: 'textarea' },
  ]

  const save = async () => {
    setSaving(true)
    try {
      if (editing) await api.put(`/admin/teachers/${editing.id}`, values)
      else await api.post('/admin/teachers', values)
      toast.success(editing ? 'Teacher updated' : 'Teacher added')
      setOpen(false)
      await load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (row) => {
    if (!confirm(`Remove ${row.user?.name}?`)) return
    await api.delete(`/admin/teachers/${row.id}`)
    toast.success('Teacher removed')
    load()
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-ink">Teachers</h1>
        <Button
          onClick={() => {
            setEditing(null)
            setValues(empty)
            setOpen(true)
          }}
        >
          Add teacher
        </Button>
      </div>
      <Card className="p-4">
        <DataTable
          rows={rows}
          searchKeys={['user.name', 'subject', 'user.email']}
          columns={[
            { key: 'name', label: 'Name', render: (r) => r.user?.name },
            { key: 'subject', label: 'Subject' },
            { key: 'qualification', label: 'Qualification' },
            { key: 'experience', label: 'Years' },
          ]}
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="px-3 py-1.5 text-xs"
                onClick={() => {
                  setEditing(row)
                  setValues({
                    name: row.user?.name,
                    email: row.user?.email,
                    subject: row.subject,
                    qualification: row.qualification,
                    experience: row.experience,
                    bio: row.bio,
                    photo: row.photo,
                    phone: row.phone,
                  })
                  setOpen(true)
                }}
              >
                Edit
              </Button>
              <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => remove(row)}>
                Delete
              </Button>
            </div>
          )}
        />
      </Card>
      <CRUDModal
        open={open}
        title={editing ? 'Edit teacher' : 'Add teacher'}
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
