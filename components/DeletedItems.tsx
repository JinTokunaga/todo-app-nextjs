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
    return new Date(dateString).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div style={{
      marginTop: '24px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '20px',
      padding: '20px 24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#374151',
          }}>
            🗑️ 削除履歴
          </span>
          <span style={{
            padding: '2px 8px',
            borderRadius: '20px',
            background: '#fee2e2',
            color: '#ef4444',
            fontSize: '13px',
            fontWeight: '600',
          }}>
            {deletedTodos.length}件
          </span>
          <span style={{
            fontSize: '14px',
            color: '#9ca3af',
            marginLeft: '4px',
            transition: 'transform 0.2s',
            display: 'inline-block',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>
            ▼
          </span>
        </button>

        <button
          onClick={onClearHistory}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: 'none',
            background: '#f3f4f6',
            color: '#6b7280',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f3f4f6')}
        >
          すべてクリア
        </button>
      </div>

      {/* List */}
      {isExpanded && (
        <div style={{ marginTop: '16px' }}>
          {deletedTodos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#fafafa',
                border: '1px solid #f3f4f6',
                marginBottom: '8px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '15px',
                  color: '#9ca3af',
                  textDecoration: 'line-through',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {todo.text}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', color: '#d1d5db' }}>
                    削除: {formatDate(todo.deletedAt)}
                  </span>
                  {todo.completed && (
                    <span style={{ fontSize: '12px', color: '#10b981' }}>完了済み</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRestore(todo)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#ede9fe',
                  color: '#7c3aed',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ddd6fe')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ede9fe')}
              >
                ↩ 復元
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
