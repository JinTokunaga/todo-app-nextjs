import { Todo } from '@/app/page'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div
      className={`group rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex-1" onClick={() => onToggle(todo.id)}>
          <p
            className={`cursor-pointer text-lg font-medium transition-all ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-800'
            }`}
          >
            {todo.text}
          </p>
          <div className="mt-1 flex gap-3 text-xs text-gray-500">
            <span>作成: {formatDate(todo.createdAt)}</span>
            {todo.completedAt && (
              <span className="text-green-600">
                完了: {formatDate(todo.completedAt)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 opacity-0 transition-all hover:bg-red-200 group-hover:opacity-100"
        >
          削除
        </button>
      </div>
    </div>
  )
}
