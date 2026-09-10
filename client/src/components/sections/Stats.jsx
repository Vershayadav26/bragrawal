const items = [
  { valueKey: 'students', fallback: 1200, label: 'Students' },
  { valueKey: 'teachers', fallback: 80, label: 'Teachers' },
  { valueKey: 'years', fallback: 28, label: 'Years' },
  { valueKey: 'achievements', fallback: 140, label: 'Awards' },
]

export default function Stats({ stats = {} }) {
  return (
    <section className="bg-primary text-white">
      <div className="container-site grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-heading text-3xl font-bold sm:text-4xl">{stats[item.valueKey] ?? item.fallback}+</p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
