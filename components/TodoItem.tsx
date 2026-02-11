import { Todo } from '@/app/page'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '14px',
      padding: '18px 20px',
      borderRadius: '16px',
      background: todo.completed ? '#f0fdf4' : '#ffffff',
      border: `2px solid ${todo.completed ? '#86efac' : '#f3f4f6'}`,
      boxShadow: todo.completed ? '0 2px 8px rgba(16,185,129,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.2s',
      marginBottom: '10px',
      position: 'relative',
    }}>
      {/* Checkbox */}
      <div
        onClick={() => onToggle(todo.id)}
        style={{
          flexShrink: 0,
          width: '24px',
          height: '24px',
          borderRadius: '8px',
          border: `2px solid ${todo.completed ? '#10b981' : '#d1d5db'}`,
          background: todo.completed ? '#10b981' : '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2px',
          transition: 'all 0.2s',
        }}
      >
        {todo.completed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L5.5 10.5L12 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, cursor: 'pointer', minWidth: 0 }} onClick={() => onToggle(todo.id)}>
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: todo.completed ? '#6b7280' : '#111827',
          textDecoration: todo.completed ? 'line-through' : 'none',
          textDecorationColor: '#10b981',
          marginBottom: '6px',
          lineHeight: '1.5',
          wordBreak: 'break-word',
        }}>
          {todo.text}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            📅 作成: {formatDate(todo.createdAt)}
          </span>
          {todo.completedAt && (
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>
              ✅ 完了: {formatDate(todo.completedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Completed badge */}
      {todo.completed && (
        <div style={{
          flexShrink: 0,
          padding: '4px 10px',
          borderRadius: '20px',
          background: '#dcfce7',
          color: '#16a34a',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          完了
        </div>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        title="削除"
        style={{
          flexShrink: 0,
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          border: 'none',
          background: '#fef2f2',
          color: '#ef4444',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          marginTop: '0',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
        onMouseLeave={e => (e.currentTarget.style.background = '#fef2f2')}
      >
        🗑
      </button>
    </div>
  )
}
