const stages = [
  { name: 'Foundational', range: 'Nursery – II', text: 'Play, phonics, number sense and outdoor time. No heavy homework.' },
  { name: 'Preparatory', range: 'III – V', text: 'Reading fluency, writing, enquiry science and a second language.' },
  { name: 'Middle', range: 'VI – VIII', text: 'Subject teachers, labs, and the first house competitions.' },
  { name: 'Secondary', range: 'IX – X', text: 'CBSE board preparation with counselling for stream choice.' },
  { name: 'Senior secondary', range: 'XI – XII', text: 'Science, commerce and humanities. University guidance from Term 1 of XI.' },
]

const departments = ['Mathematics', 'Sciences', 'Languages', 'Humanities', 'Computer Science', 'Physical Education', 'Visual & performing arts']

export default function Academics() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Academics</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">CBSE, with labs and arts on the same timetable.</h1>
          <p className="mt-4 max-w-2xl text-white/80">Affiliation number 2630018. The school follows the CBSE curriculum with internal assessments each term and public examinations in X and XII.</p>
        </div>
      </section>
      <section className="container-site py-16">
        <h2 className="font-heading text-3xl font-bold text-ink">School stages</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <article key={stage.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{stage.range}</p>
              <h3 className="mt-1 font-heading text-lg font-semibold">{stage.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{stage.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-ink">Departments</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {departments.map((d) => (
                <li key={d} className="rounded-xl bg-surface px-4 py-3 font-medium text-slate-700">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
            alt="Classroom"
            className="h-72 w-full rounded-3xl object-cover lg:h-full"
          />
        </div>
      </section>
    </>
  )
}
