import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/about', label: 'About' },
      { to: '/academics', label: 'Academics' },
      { to: '/faculty', label: 'Faculty' },
      { to: '/gallery', label: 'Gallery' },
    ],
  },
  {
    title: 'Admissions',
    links: [
      { to: '/admissions', label: 'Apply' },
      { to: '/events', label: 'Events & notices' },
      { to: '/contact', label: 'Contact' },
      { to: '/login', label: 'Portal login' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary-dark text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            CBSE-affiliated day school in Chandigarh. Nursery to Class XII, with a focus on academics, arts, and sport.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-heading text-sm font-semibold">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-3 text-sm text-white/75">
          <p className="font-heading text-sm font-semibold text-white">Campus</p>
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
            12 Lakeview Avenue, Sector 45, Chandigarh 160047
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-accent" /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-accent" /> admissions@greenwood.edu
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Greenwood International School. All rights reserved.
      </div>
    </footer>
  )
}
