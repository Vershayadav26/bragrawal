import { useMemo, useState } from 'react'
import Table from '../common/Table'
import EmptyState from '../common/EmptyState'

export default function DataTable({ columns, rows, searchKeys = [], actions, title }) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    if (!q.trim()) return rows
    const needle = q.toLowerCase()
    return rows.filter((row) =>
      searchKeys.some((key) => String(key.split('.').reduce((acc, part) => acc?.[part], row) ?? '').toLowerCase().includes(needle)),
    )
  }, [q, rows, searchKeys])

  const cols = actions
    ? [...columns, { key: '_actions', label: '', render: (row) => actions(row) }]
    : columns

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {title ? <h2 className="font-heading text-lg font-semibold text-ink">{title}</h2> : <span />}
        <input
          className="input max-w-xs"
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {filtered.length ? (
        <Table columns={cols} rows={filtered} />
      ) : (
        <EmptyState title="No matching records" hint="Try another search or add a new entry." />
      )}
    </div>
  )
}
