import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-primary-dark text-white">
      <img
        src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80"
        alt="Greenwood campus"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary/40" />
      <div className="container-site relative flex min-h-[88vh] flex-col justify-center py-24">
        <p className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-ink">
          Admissions open for 2026–27
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          A school built around curiosity, character, and craft.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
          Greenwood International School is a CBSE day school in Chandigarh for Nursery to Class XII — laboratories, performing arts, and sport on one campus.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/admissions"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink shadow-sm hover:bg-accent-dark hover:text-white"
          >
            Apply for admission
          </Link>
          <Link
            to="/academics"
            className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Explore academics
          </Link>
        </div>
      </div>
    </section>
  )
}
