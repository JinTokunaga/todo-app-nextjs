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
    const messages = {
      all: { icon: '📋', text: 'タスクがありません', sub: '上の入力欄からタスクを追加しましょう！' },
      active: { icon: '🎉', text: '未完了のタスクはありません', sub: 'すべてのタスクが完了しています！' },
      completed: { icon: '📝', text: '完了済みのタスクはありません', sub: 'タスクを完了するとここに表示されます。' },
    }
    const { icon, text, sub } = messages[filter]

    return (
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: '20px',
        padding: '48px 24px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{icon}</div>
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>{text}</p>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>{sub}</p>
      </div>
    )
  }

  return (
    <div>
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
