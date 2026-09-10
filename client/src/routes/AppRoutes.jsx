import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Bell,
  CalendarDays,
  GraduationCap,
  Images,
  Inbox,
  LayoutDashboard,
  Users,
} from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout'
import DashboardLayout from '../components/layout/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import About from '../pages/About'
import Academics from '../pages/Academics'
import Faculty from '../pages/Faculty'
import Admissions from '../pages/Admissions'
import EventsNotices from '../pages/EventsNotices'
import Gallery from '../pages/Gallery'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import StudentDashboard from '../pages/dashboards/StudentDashboard'
import TeacherDashboard from '../pages/dashboards/TeacherDashboard'
import AdminOverview from '../pages/admin/AdminOverview'
import AdminStudents from '../pages/admin/AdminStudents'
import AdminTeachers from '../pages/admin/AdminTeachers'
import AdminNotices from '../pages/admin/AdminNotices'
import AdminEvents from '../pages/admin/AdminEvents'
import AdminAdmissions from '../pages/admin/AdminAdmissions'
import AdminGallery from '../pages/admin/AdminGallery'

const adminItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: GraduationCap },
  { to: '/admin/teachers', label: 'Teachers', icon: Users },
  { to: '/admin/notices', label: 'Notices', icon: Bell },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/admissions', label: 'Admissions', icon: Inbox },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
]

const studentItems = [{ to: '/student', label: 'Overview', icon: LayoutDashboard, end: true }]
const teacherItems = [{ to: '/teacher', label: 'Overview', icon: LayoutDashboard, end: true }]

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/events" element={<EventsNotices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute roles={['STUDENT']} />}>
        <Route element={<DashboardLayout items={studentItems} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['TEACHER']} />}>
        <Route element={<DashboardLayout items={teacherItems} />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['ADMIN']} />}>
        <Route element={<DashboardLayout items={adminItems} />}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/admissions" element={<AdminAdmissions />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
