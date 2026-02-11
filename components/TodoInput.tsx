import { useState } from 'react'

interface TodoInputProps {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAdd(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{
            flex: 1,
            padding: '14px 18px',
            fontSize: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            outline: 'none',
            color: '#111827',
            background: '#f9fafb',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = '#667eea'
            e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.15)'
            e.target.style.background = '#ffffff'
          }}
          onBlur={e => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = 'none'
            e.target.style.background = '#f9fafb'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '14px 24px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(102,126,234,0.4)',
            transition: 'opacity 0.2s, transform 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ＋ 追加
        </button>
      </div>
    </form>
  )
}
