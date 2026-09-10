import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../components/common/Button'
import api from '../services/api'

const steps = [
  { n: '01', title: 'Enquiry', text: 'Submit the form or visit the admissions desk on a working day.' },
  { n: '02', title: 'Interaction', text: 'Student and parents meet a teacher. Younger years include an informal classroom visit.' },
  { n: '03', title: 'Offer', text: 'A written offer follows review of records. Fee details are shared with the offer letter.' },
]

const grades = ['Nursery', 'Class 1', 'Class 6', 'Class 9', 'Class 11 Science', 'Class 11 Commerce', 'Class 11 Humanities']

export default function Admissions() {
  const [form, setForm] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    applyingFor: '',
    previousSchool: '',
    message: '',
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await api.post('/public/admissions', form)
      toast.success(data.message)
      setForm({ studentName: '', parentName: '', email: '', phone: '', applyingFor: '', previousSchool: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit the form')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Admissions</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">Join Greenwood in 2026–27.</h1>
          <p className="mt-4 max-w-2xl text-white/80">Places are offered after an interaction. Boarding is not available. Transport covers Chandigarh, Mohali and Panchkula.</p>
        </div>
      </section>
      <section className="container-site grid gap-8 py-16 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.n} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-heading text-2xl font-bold text-accent">{step.n}</p>
            <h3 className="mt-2 font-heading text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.text}</p>
          </div>
        ))}
      </section>
      <section className="bg-white py-16">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-ink">Admission enquiry</h2>
            <p className="mt-2 text-slate-600">The office responds within two working days. Required fields are marked.</p>
            <form className="mt-8 space-y-4" onSubmit={submit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="label">Student name</span>
                  <input className="input" required value={form.studentName} onChange={(e) => set('studentName', e.target.value)} />
                </label>
                <label>
                  <span className="label">Parent / guardian</span>
                  <input className="input" required value={form.parentName} onChange={(e) => set('parentName', e.target.value)} />
                </label>
                <label>
                  <span className="label">Email</span>
                  <input className="input" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
                </label>
                <label>
                  <span className="label">Phone</span>
                  <input className="input" required value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </label>
                <label>
                  <span className="label">Applying for</span>
                  <select className="input" required value={form.applyingFor} onChange={(e) => set('applyingFor', e.target.value)}>
                    <option value="">Select class</option>
                    {grades.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="label">Previous school</span>
                  <input className="input" value={form.previousSchool} onChange={(e) => set('previousSchool', e.target.value)} />
                </label>
              </div>
              <label>
                <span className="label">Message</span>
                <textarea className="input min-h-[100px]" value={form.message} onChange={(e) => set('message', e.target.value)} />
              </label>
              <Button type="submit" disabled={saving}>
                {saving ? 'Sending…' : 'Submit enquiry'}
              </Button>
            </form>
          </div>
          <div className="rounded-3xl bg-surface p-8">
            <h3 className="font-heading text-xl font-semibold">Fee note</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A detailed fee sheet is issued with the offer. Registration is ₹2,500. Tuition is billed quarterly. Transport and meals are optional. Scholarships for Class XI are awarded on Class X board results and an interview.
            </p>
            <p className="mt-6 text-sm text-slate-600">
              Desk hours: Monday–Friday, 9:00 AM – 3:00 PM
              <br />
              Email: admissions@greenwood.edu
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
