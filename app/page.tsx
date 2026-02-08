'use client'

import { useState, useEffect } from 'react'
import { TodoList } from '@/components/TodoList'
import { DeletedItems } from '@/components/DeletedItems'
import { TodoInput } from '@/components/TodoInput'
import { FilterButtons } from '@/components/FilterButtons'
import { Header } from '@/components/Header'

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

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    if (savedDeletedTodos) {
      setDeletedTodos(JSON.parse(savedDeletedTodos))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos))
    }
  }, [deletedTodos, mounted])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : undefined
          }
        : todo
    ))
  }

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id)
    if (todoToDelete) {
      const deletedTodo: DeletedTodo = {
        ...todoToDelete,
        deletedAt: new Date().toISOString()
      }
      setDeletedTodos([deletedTodo, ...deletedTodos])
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  const restoreTodo = (deletedTodo: DeletedTodo) => {
    const { deletedAt, ...todo } = deletedTodo
    setTodos([todo, ...todos])
    setDeletedTodos(deletedTodos.filter(t => t.id !== deletedTodo.id))
  }

  const clearDeletedHistory = () => {
    if (confirm('削除履歴をすべてクリアしますか？この操作は取り消せません。')) {
      setDeletedTodos([])
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Header />

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <TodoInput onAdd={addTodo} />
          <FilterButtons
            filter={filter}
            setFilter={setFilter}
            todos={todos}
          />
        </div>

        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

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
