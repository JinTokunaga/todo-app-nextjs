# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A high-quality TODO application built with Next.js 16, TypeScript, and Tailwind CSS. Features include task management with localStorage persistence, deleted items history with restore functionality, and improved UI/UX with proper contrast and readability.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

**Tech Stack:**
- Next.js 16 (App Router)
- React 19 with TypeScript
- Tailwind CSS for styling
- localStorage for data persistence

**Key Files:**
- `app/page.tsx` - Main page component with state management
- `components/` - Reusable UI components
  - `Header.tsx` - App header
  - `TodoInput.tsx` - Add todo form
  - `FilterButtons.tsx` - Filter controls
  - `TodoList.tsx` - Todo list container
  - `TodoItem.tsx` - Individual todo item
  - `DeletedItems.tsx` - Deleted items history panel

**Data Models:**
```typescript
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
  completedAt?: string
}

interface DeletedTodo extends Todo {
  deletedAt: string
}
```

**Key Features:**
- ✅ Add, complete, and delete todos
- 🔄 Filter by all/active/completed
- 💾 localStorage persistence (survives page refresh)
- 🗑️ Deleted items history with restore functionality
- 📅 Timestamp tracking (created, completed, deleted)
- 🎨 Modern UI with gradient backgrounds and smooth transitions
- 📱 Fully responsive design
- ♿ Accessible with proper contrast ratios

**State Management:**
- Client-side React hooks (`useState`, `useEffect`)
- localStorage sync for persistence
- Mounted state handling to prevent hydration mismatches
