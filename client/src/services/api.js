import { getDb, setDb, id } from './mockDb'

const FALLBACK_EVENT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'

function ok(data) {
  return Promise.resolve({ data })
}

function fail(message, status = 400) {
  const err = new Error(message)
  err.response = { status, data: { message } }
  return Promise.reject(err)
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem('gis_user') || 'null')
  } catch {
    return null
  }
}

function withClass(student, db) {
  return { ...student, class: db.classes.find((c) => c.id === student.classId) || student.class }
}

const api = {
  async get(url) {
    const db = getDb()
    const user = currentUser()

    if (url === '/auth/me') {
      if (!user) return fail('Authentication required', 401)
      return ok({ user, student: db.students.find((s) => s.userId === user.id) || null, teacher: db.teachers.find((t) => t.userId === user.id) || null })
    }
    if (url === '/public/stats') {
      return ok({ students: db.students.length + 1180, teachers: db.teachers.length + 72, years: 28, achievements: 140, notices: db.notices.length, events: db.events.length })
    }
    if (url === '/public/notices' || url === '/admin/notices') {
      return ok([...db.notices].sort((a, b) => Number(b.pinned) - Number(a.pinned)))
    }
    if (url === '/public/events' || url === '/admin/events') return ok(db.events)
    if (url === '/public/gallery' || url === '/admin/gallery') return ok(db.gallery)
    if (url === '/public/faculty' || url === '/admin/teachers') return ok(db.teachers)
    if (url === '/admin/overview') {
      return ok({
        stats: {
          students: db.students.length,
          teachers: db.teachers.length,
          notices: db.notices.length,
          events: db.events.length,
          admissions: db.admissions.length,
          pending: db.admissions.filter((a) => a.status === 'PENDING').length,
        },
        recentAdmissions: [...db.admissions].slice(0, 5),
      })
    }
    if (url === '/admin/classes') return ok(db.classes)
    if (url === '/admin/students') return ok(db.students.map((s) => withClass(s, db)))
    if (url === '/admin/admissions') return ok(db.admissions)
    if (url === '/students/me') {
      const student = db.students.find((s) => s.userId === user?.id)
      if (!student) return fail('Student profile not found', 404)
      return ok(withClass(student, db))
    }
    if (url === '/students/timetable') {
      const student = db.students.find((s) => s.userId === user?.id)
      return ok(db.timetable.filter((t) => t.classId === student?.classId))
    }
    if (url === '/students/attendance') {
      const student = db.students.find((s) => s.userId === user?.id)
      const records = db.attendance.filter((a) => a.studentId === student?.id)
      const present = records.filter((r) => r.status === 'PRESENT').length
      const late = records.filter((r) => r.status === 'LATE').length
      const absent = records.filter((r) => r.status === 'ABSENT').length
      const percent = records.length ? Math.round(((present + late) / records.length) * 100) : 0
      return ok({ records, summary: { present, late, absent, total: records.length, percent } })
    }
    if (url === '/students/results') {
      const student = db.students.find((s) => s.userId === user?.id)
      return ok(db.results.filter((r) => r.studentId === student?.id))
    }
    if (url === '/teachers/me') {
      const teacher = db.teachers.find((t) => t.userId === user?.id)
      if (!teacher) return fail('Teacher profile not found', 404)
      return ok(teacher)
    }
    if (url === '/teachers/students') {
      const teacher = db.teachers.find((t) => t.userId === user?.id)
      const classIds = [...new Set(db.timetable.filter((t) => t.teacherId === teacher?.id).map((t) => t.classId))]
      return ok(db.students.filter((s) => classIds.includes(s.classId)).map((s) => withClass(s, db)))
    }
    if (url === '/teachers/timetable') {
      const teacher = db.teachers.find((t) => t.userId === user?.id)
      return ok(db.timetable.filter((t) => t.teacherId === teacher?.id))
    }
    return fail(`Unknown GET ${url}`, 404)
  },

  async post(url, body = {}) {
    const db = getDb()
    const user = currentUser()

    if (url === '/auth/login') {
      const found = db.users.find((u) => u.email === body.email?.toLowerCase().trim() && u.password === body.password)
      if (!found) return fail('Invalid email or password', 401)
      const publicUser = { id: found.id, name: found.name, email: found.email, role: found.role }
      return ok({ token: 'local-demo-token', user: publicUser })
    }
    if (url === '/public/contact') {
      if (!body.name || !body.email || !body.message) return fail('Name, email and message are required')
      return ok({ message: 'Thank you. We will get back to you shortly.', id: id() })
    }
    if (url === '/public/admissions') {
      if (!body.studentName || !body.parentName || !body.email || !body.phone || !body.applyingFor) {
        return fail('Please fill in all required fields')
      }
      db.admissions.unshift({ id: id(), ...body, previousSchool: body.previousSchool || '', message: body.message || '', status: 'PENDING', createdAt: new Date().toISOString() })
      setDb(db)
      return ok({ message: 'Application received. Our admissions team will contact you.' })
    }
    if (url === '/teachers/attendance') {
      const teacher = db.teachers.find((t) => t.userId === user?.id)
      db.attendance = db.attendance.filter((a) => a.date !== body.date || !body.records?.some((r) => r.studentId === a.studentId))
      body.records?.forEach((row) => {
        db.attendance.push({ id: id(), studentId: row.studentId, date: body.date, status: row.status, markedBy: teacher?.id || 't1' })
      })
      setDb(db)
      return ok({ message: 'Attendance saved' })
    }
    if (url === '/admin/students') {
      const cls = db.classes.find((c) => c.id === body.classId)
      const student = {
        id: id(),
        userId: id(),
        user: { name: body.name, email: body.email },
        classId: body.classId,
        class: cls,
        rollNumber: body.rollNumber,
        parentName: body.parentName || '',
        phone: body.phone || '',
        dob: body.dob || '',
        address: body.address || '',
        gender: body.gender || 'Other',
      }
      db.students.push(student)
      setDb(db)
      return ok(student)
    }
    if (url === '/admin/teachers') {
      const teacher = {
        id: id(),
        userId: id(),
        user: { name: body.name, email: body.email },
        subject: body.subject,
        qualification: body.qualification || '',
        experience: Number(body.experience) || 0,
        bio: body.bio || '',
        photo: body.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        phone: body.phone || '',
      }
      db.teachers.push(teacher)
      setDb(db)
      return ok(teacher)
    }
    if (url === '/admin/notices') {
      const item = { id: id(), title: body.title, content: body.content, category: body.category || 'General', pinned: Boolean(body.pinned), date: new Date().toISOString() }
      db.notices.unshift(item)
      setDb(db)
      return ok(item)
    }
    if (url === '/admin/events') {
      const item = { id: id(), title: body.title, description: body.description || '', date: body.date, venue: body.venue || '', image: body.image || FALLBACK_EVENT_IMAGE }
      db.events.unshift(item)
      setDb(db)
      return ok(item)
    }
    if (url === '/admin/gallery') {
      const item = { id: id(), title: body.title, imageUrl: body.imageUrl, category: body.category || 'Campus' }
      db.gallery.unshift(item)
      setDb(db)
      return ok(item)
    }
    return fail(`Unknown POST ${url}`, 404)
  },

  async put(url, body = {}) {
    const db = getDb()
    const [, , resource, itemId] = url.split('/')

    const updateList = (key, patch) => {
      const idx = db[key].findIndex((x) => x.id === itemId)
      if (idx < 0) return fail('Not found', 404)
      db[key][idx] = { ...db[key][idx], ...patch }
      setDb(db)
      return ok(db[key][idx])
    }

    if (resource === 'students') {
      const idx = db.students.findIndex((s) => s.id === itemId)
      if (idx < 0) return fail('Student not found', 404)
      const cls = db.classes.find((c) => c.id === body.classId)
      db.students[idx] = {
        ...db.students[idx],
        ...body,
        user: { name: body.name || db.students[idx].user.name, email: body.email || db.students[idx].user.email },
        class: cls || db.students[idx].class,
      }
      setDb(db)
      return ok(db.students[idx])
    }
    if (resource === 'teachers') {
      const idx = db.teachers.findIndex((t) => t.id === itemId)
      if (idx < 0) return fail('Teacher not found', 404)
      db.teachers[idx] = {
        ...db.teachers[idx],
        ...body,
        user: { name: body.name || db.teachers[idx].user.name, email: body.email || db.teachers[idx].user.email },
      }
      setDb(db)
      return ok(db.teachers[idx])
    }
    if (resource === 'notices') return updateList('notices', { ...body, pinned: body.pinned === true || body.pinned === 'true' })
    if (resource === 'events') return updateList('events', body)
    if (resource === 'gallery') return updateList('gallery', body)
    if (resource === 'admissions') return updateList('admissions', { status: body.status })
    return fail(`Unknown PUT ${url}`, 404)
  },

  async delete(url) {
    const db = getDb()
    const parts = url.split('/')
    const resource = parts[2]
    const itemId = parts[3]
    const key = resource
    if (!db[key]) return fail(`Unknown DELETE ${url}`, 404)
    db[key] = db[key].filter((x) => x.id !== itemId)
    setDb(db)
    return ok({ message: 'Deleted' })
  },
}

export default api
