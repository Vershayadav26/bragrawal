import { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/common/Button'
import api from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await api.post('/public/contact', form)
      toast.success(data.message)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send the message')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Contact</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">Write to the school office.</h1>
        </div>
      </section>
      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="label">Name</span>
              <input className="input" required value={form.name} onChange={(e) => set('name', e.target.value)} />
            </label>
            <label>
              <span className="label">Email</span>
              <input className="input" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
            </label>
            <label>
              <span className="label">Phone</span>
              <input className="input" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </label>
            <label>
              <span className="label">Subject</span>
              <input className="input" value={form.subject} onChange={(e) => set('subject', e.target.value)} />
            </label>
          </div>
          <label>
            <span className="label">Message</span>
            <textarea className="input min-h-[120px]" required value={form.message} onChange={(e) => set('message', e.target.value)} />
          </label>
          <Button type="submit" disabled={saving}>
            {saving ? 'Sending…' : 'Send message'}
          </Button>
        </form>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-600">
            <p className="flex gap-2">
              <MapPin className="text-primary" size={18} /> 12 Lakeview Avenue, Sector 45, Chandigarh 160047
            </p>
            <p className="flex gap-2">
              <Phone className="text-primary" size={18} /> +91 98765 43210
            </p>
            <p className="flex gap-2">
              <Mail className="text-primary" size={18} /> office@greenwood.edu
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Campus map"
              className="h-64 w-full"
              loading="lazy"
              src="https://maps.google.com/maps?q=Chandigarh%20Sector%2045&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  )
}
