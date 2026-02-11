'use client'

import { useState, useEffect } from 'react'
import { TodoList } from '@/components/TodoList'
import { DeletedItems } from '@/components/DeletedItems'
import { TodoInput } from '@/components/TodoInput'
import { FilterButtons } from '@/components/FilterButtons'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
  completedAt?: string
}

export interface DeletedTodo extends Todo {
  deletedAt: string
}

export type FilterType = 'all' | 'active' | 'completed'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [deletedTodos, setDeletedTodos] = useState<DeletedTodo[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTodos = localStorage.getItem('todos')
    const savedDeletedTodos = localStorage.getItem('deletedTodos')
    if (savedTodos) setTodos(JSON.parse(savedTodos))
    if (savedDeletedTodos) setDeletedTodos(JSON.parse(savedDeletedTodos))
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos, mounted])

  useEffect(() => {
    if (mounted) localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos))
  }, [deletedTodos, mounted])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : undefined }
        : todo
    ))
  }

  const deleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      setDeletedTodos([{ ...todo, deletedAt: new Date().toISOString() }, ...deletedTodos])
      setTodos(todos.filter(t => t.id !== id))
    }
  }

  const restoreTodo = (deleted: DeletedTodo) => {
    const { deletedAt, ...todo } = deleted
    setTodos([todo, ...todos])
    setDeletedTodos(deletedTodos.filter(t => t.id !== deleted.id))
  }

  const clearDeletedHistory = () => {
    setDeletedTodos([])
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  if (!mounted) return null

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-1px',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            ✅ TODO App
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
            タスクを管理して、毎日を効率よく
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: '合計', value: todos.length, color: '#6366f1' },
            { label: '未完了', value: activeCount, color: '#f59e0b' },
            { label: '完了', value: completedCount, color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.25)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff' }}>{value}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          marginBottom: '24px',
        }}>
          <TodoInput onAdd={addTodo} />
          <FilterButtons filter={filter} setFilter={setFilter} todos={todos} />
        </div>

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        {/* Deleted History */}
        {deletedTodos.length > 0 && (
          <DeletedItems
            deletedTodos={deletedTodos}
            onRestore={restoreTodo}
            onClearHistory={clearDeletedHistory}
          />
        )}
      </div>
    </div>
  )
}
