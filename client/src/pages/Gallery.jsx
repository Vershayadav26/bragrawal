import { useEffect, useMemo, useState } from 'react'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import Modal from '../components/common/Modal'
import api from '../services/api'

export default function Gallery() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/gallery').then((res) => setItems(res.data)).finally(() => setLoading(false))
  }, [])

  const cats = useMemo(() => ['All', ...new Set(items.map((i) => i.category))], [items])
  const visible = filter === 'All' ? items : items.filter((i) => i.category === filter)

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="container-site">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Gallery</p>
          <h1 className="mt-2 font-heading text-4xl font-bold">Campus in pictures</h1>
        </div>
      </section>
      <section className="container-site py-16">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === c ? 'bg-primary text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            {visible.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item)}
                    className="group overflow-hidden rounded-2xl text-left"
                  >
                    <img src={item.imageUrl} alt={item.title} className="h-56 w-full object-cover transition group-hover:scale-[1.03]" />
                    <span className="mt-2 block text-sm font-medium text-slate-700">{item.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState title="No photographs in this album" />
            )}
          </>
        )}
      </section>
      <Modal open={Boolean(active)} title={active?.title} onClose={() => setActive(null)} wide>
        {active ? <img src={active.imageUrl} alt={active.title} className="w-full rounded-xl object-cover" /> : null}
      </Modal>
    </>
  )
}
