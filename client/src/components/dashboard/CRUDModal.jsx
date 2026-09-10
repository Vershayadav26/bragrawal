import Button from '../common/Button'
import Modal from '../common/Modal'

export default function CRUDModal({
  open,
  title,
  fields,
  values,
  onChange,
  onClose,
  onSubmit,
  saving,
}) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="label">{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                className="input min-h-[100px]"
                value={values[field.name] ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                className="input"
                value={values[field.name] ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
              >
                <option value="">Select</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="input"
                type={field.type || 'text'}
                value={values[field.name] ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
              />
            )}
          </label>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
