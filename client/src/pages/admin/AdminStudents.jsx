import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Loader from '../../components/common/Loader'
import DataTable from '../../components/dashboard/DataTable'
import CRUDModal from '../../components/dashboard/CRUDModal'
import api from '../../services/api'

export default function AdminStudents() {
  const [rows, setRows] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const empty = {
    name: '',
    email: '',
    password: 'Student@123',
    classId: '',
    rollNumber: '',
    parentName: '',
    phone: '',
    dob: '',
    address: '',
    gender: 'Other',
  }
  const [values, setValues] = useState(empty)

  const load = useCallback(async () => {
    const [s, c] = await Promise.all([api.get('/admin/students'), api.get('/admin/classes')])
    setRows(s.data)
    setClasses(c.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    ...(!editing ? [{ name: 'password', label: 'Password', placeholder: 'Student@123' }] : []),
    {
      name: 'classId',
      label: 'Class',
      type: 'select',
      required: true,
      options: classes.map((c) => ({ value: c.id, label: `${c.name} ${c.section}` })),
    },
    { name: 'rollNumber', label: 'Roll number', required: true },
    { name: 'parentName', label: 'Parent name' },
    { name: 'phone', label: 'Phone' },
    { name: 'dob', label: 'Date of birth', type: 'date' },
    { name: 'address', label: 'Address' },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' },
        { value: 'Other', label: 'Other' },
      ],
    },
  ]

  const save = async () => {
    setSaving(true)
    try {
      if (editing) await api.put(`/admin/students/${editing.id}`, values)
      else await api.post('/admin/students', values)
      toast.success(editing ? 'Student updated' : 'Student added')
      setOpen(false)
      setEditing(null)
      await load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (row) => {
    if (!confirm(`Remove ${row.user?.name}?`)) return
    await api.delete(`/admin/students/${row.id}`)
    toast.success('Student removed')
    load()
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-ink">Students</h1>
        <Button
          onClick={() => {
            setEditing(null)
            setValues({ ...empty, classId: classes[0]?.id || '' })
            setOpen(true)
          }}
        >
          Add student
        </Button>
      </div>
      <Card className="p-4">
        <DataTable
          rows={rows}
          searchKeys={['user.name', 'user.email', 'rollNumber']}
          columns={[
            { key: 'name', label: 'Name', render: (r) => r.user?.name },
            { key: 'email', label: 'Email', render: (r) => r.user?.email },
            { key: 'class', label: 'Class', render: (r) => `${r.class?.name} ${r.class?.section}` },
            { key: 'rollNumber', label: 'Roll' },
            { key: 'phone', label: 'Phone' },
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
                    classId: row.classId,
                    rollNumber: row.rollNumber,
                    parentName: row.parentName,
                    phone: row.phone,
                    dob: row.dob,
                    address: row.address,
                    gender: row.gender,
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
        title={editing ? 'Edit student' : 'Add student'}
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
