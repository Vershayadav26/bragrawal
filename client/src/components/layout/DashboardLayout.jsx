import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Logo from './Logo'
import Sidebar from './Sidebar'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout({ items, title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-ink">{user?.name}</p>
              <p className="text-xs capitalize text-slate-500">{user?.role?.toLowerCase()}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 md:hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold ${isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar items={items} />
        <div className="min-w-0 flex-1 p-4 sm:p-8">
          {title ? <h1 className="mb-6 font-heading text-2xl font-bold text-ink">{title}</h1> : null}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
