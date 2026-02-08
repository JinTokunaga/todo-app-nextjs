import { Todo, FilterType } from '@/app/page'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  filter: FilterType
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
        <div className="mb-4 text-6xl">📝</div>
        <p className="text-xl text-gray-500">
          {filter === 'all' && 'タスクがありません。上から追加してみましょう！'}
          {filter === 'active' && '未完了のタスクはありません！'}
          {filter === 'completed' && '完了したタスクはありません。'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
