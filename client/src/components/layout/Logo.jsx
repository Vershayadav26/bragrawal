import { NavLink } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? 'bg-white/15 text-accent' : 'bg-primary text-accent'}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10 12 4l9 6v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8Z" />
          <path d="M9 21v-8h6v8" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-heading text-sm font-bold ${light ? 'text-white' : 'text-primary'}`}>Greenwood</span>
        <span className={`block text-[11px] tracking-wide ${light ? 'text-white/70' : 'text-slate-500'}`}>International School</span>
      </span>
    </NavLink>
  )
}
