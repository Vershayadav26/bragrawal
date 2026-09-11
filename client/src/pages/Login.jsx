import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'

const demos = [
  { role: 'Admin', email: 'admin@bragrawal.edu', password: 'Admin@123' },
  { role: 'Teacher', email: 'teacher@bragrawal.edu', password: 'Teacher@123' },
  { role: 'Student', email: 'student@bragrawal.edu', password: 'Student@123' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@bragrawal.edu')
  const [password, setPassword] = useState('Admin@123')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const user = await login(email, password)
      toast.success(`Welcome, ${user.name}`)
      const path = user.role === 'ADMIN' ? '/admin' : user.role === 'TEACHER' ? '/teacher' : '/student'
      navigate(path)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sign in failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="container-site grid min-h-[70vh] items-center gap-10 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Portal</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-ink">Sign in to bragrawal.</h1>
        <p className="mt-3 text-slate-600">Students, teachers and the office use the same login. Access depends on your role.</p>
        <div className="mt-8 space-y-2 text-sm">
          {demos.map((d) => (
            <button
              key={d.email}
              type="button"
              onClick={() => {
                setEmail(d.email)
                setPassword(d.password)
              }}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-primary/40"
            >
              <span className="font-semibold text-ink">{d.role}</span>
              <span className="text-slate-500">{d.email}</span>
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <label className="block">
          <span className="label">Email</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="mt-4 block">
          <span className="label">Password</span>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <Button type="submit" className="mt-6 w-full" disabled={saving}>
          {saving ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </section>
  )
}
