import { NavLink } from 'react-router-dom'

export default function Sidebar({ items }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {item.icon ? <item.icon size={16} /> : null}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
