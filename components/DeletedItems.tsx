import { useState } from 'react'
import { DeletedTodo } from '@/app/page'

interface DeletedItemsProps {
  deletedTodos: DeletedTodo[]
  onRestore: (todo: DeletedTodo) => void
  onClearHistory: () => void
}

export function DeletedItems({ deletedTodos, onRestore, onClearHistory }: DeletedItemsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xl font-bold text-gray-700 transition-colors hover:text-gray-900"
        >
          <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
          削除履歴
          <span className="text-sm font-normal text-gray-500">
            ({deletedTodos.length}件)
          </span>
        </button>
        {deletedTodos.length > 0 && (
          <button
            onClick={onClearHistory}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200"
          >
            履歴をクリア
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {deletedTodos.map((todo) => (
            <div
              key={todo.id}
              className="group flex items-start gap-4 rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-600 line-through">
                  {todo.text}
                </p>
                <div className="mt-1 flex gap-3 text-xs text-gray-500">
                  <span>削除: {formatDate(todo.deletedAt)}</span>
                  {todo.completed && (
                    <span className="text-green-600">完了済み</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRestore(todo)}
                className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 opacity-0 transition-all hover:bg-blue-200 group-hover:opacity-100"
              >
                復元
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
