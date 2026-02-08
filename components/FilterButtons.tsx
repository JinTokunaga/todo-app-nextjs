import { FilterType, Todo } from '@/app/page'

interface FilterButtonsProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  todos: Todo[]
}

export function FilterButtons({ filter, setFilter, todos }: FilterButtonsProps) {
  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  const buttons: { label: string; value: FilterType; count: number }[] = [
    { label: 'すべて', value: 'all', count: todos.length },
    { label: '未完了', value: 'active', count: activeCount },
    { label: '完了', value: 'completed', count: completedCount }
  ]

  return (
    <div className="flex gap-2">
      {buttons.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
            filter === value
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label} <span className="ml-1 text-sm opacity-80">({count})</span>
        </button>
      ))}
    </div>
  )
}
