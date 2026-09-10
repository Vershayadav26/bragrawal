import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

export default function MobileMenu({ open, onClose, links, extra }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col bg-white p-5 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-heading font-semibold text-primary">Menu</p>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        {extra ? <div className="mt-6">{extra}</div> : null}
      </div>
    </div>
  )
}
