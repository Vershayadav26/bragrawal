import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, dashboardPath } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur' : 'border-transparent bg-white'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          {user ? (
            <Link to={dashboardPath} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
              Login
            </Link>
          )}
        </div>
        <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        links={links}
        extra={
          user ? (
            <Link to={dashboardPath} onClick={() => setOpen(false)} className="block rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white">
              Login
            </Link>
          )
        }
      />
    </header>
  )
}
