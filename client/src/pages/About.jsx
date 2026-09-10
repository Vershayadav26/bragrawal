const values = [
  { title: 'Curiosity', text: 'Students are expected to ask better questions, not only produce correct answers.' },
  { title: 'Character', text: 'Courtesy, honesty and responsibility are taught in tutor time as seriously as any subject.' },
  { title: 'Craft', text: 'Work in labs, studios and on the field is assessed for care, not only for marks.' },
]

export default function About() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">About</p>
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold">A Chandigarh day school since 1998.</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Greenwood International School opened with two classes and 64 students. It is now a Nursery–XII campus of about 1,200 students on Lakeview Avenue, Sector 45.
          </p>
        </div>
      </section>
      <section className="container-site grid items-center gap-10 py-16 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
          alt="Graduation at Greenwood"
          className="h-80 w-full rounded-3xl object-cover"
        />
        <div>
          <h2 className="font-heading text-3xl font-bold text-ink">Principal’s note</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We keep the school small enough that teachers know families, and ambitious enough that a Class XII student can sit a national entrance exam without leaving campus for coaching. That balance is the work of every timetable, not a slogan.
          </p>
          <p className="mt-4 font-heading font-semibold text-primary">Anita Sharma, Principal</p>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container-site">
          <h2 className="font-heading text-3xl font-bold text-ink">Mission and vision</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading text-lg font-semibold">Mission</h3>
              <p className="mt-2 text-sm text-slate-600">To educate students who can think clearly, work with others, and take responsibility for the community they join after school.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading text-lg font-semibold">Vision</h3>
              <p className="mt-2 text-sm text-slate-600">A school in which academic stretch, arts and sport share equal dignity, and every student is known by name.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="rounded-2xl bg-surface p-6">
                <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
