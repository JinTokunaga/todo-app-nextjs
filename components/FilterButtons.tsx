import { FilterType, Todo } from '@/app/page'

interface FilterButtonsProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  todos: Todo[]
}

export function FilterButtons({ filter, setFilter, todos }: FilterButtonsProps) {
  const buttons: { label: string; value: FilterType; count: number }[] = [
    { label: 'すべて', value: 'all', count: todos.length },
    { label: '未完了', value: 'active', count: todos.filter(t => !t.completed).length },
    { label: '完了済み', value: 'completed', count: todos.filter(t => t.completed).length },
  ]

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {buttons.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          style={{
            flex: 1,
            padding: '10px 8px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: filter === value
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : '#f3f4f6',
            color: filter === value ? '#ffffff' : '#6b7280',
            boxShadow: filter === value ? '0 4px 10px rgba(102,126,234,0.35)' : 'none',
          }}
        >
          {label}
          <span style={{
            marginLeft: '6px',
            padding: '2px 7px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            background: filter === value ? 'rgba(255,255,255,0.25)' : '#e5e7eb',
            color: filter === value ? '#ffffff' : '#6b7280',
          }}>
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}
