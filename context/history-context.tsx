'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export interface HistoryEntry {
  id: string
  calculatorName: string
  summary: string
  result: string
  timestamp: number
}

interface HistoryContextType {
  entries: HistoryEntry[]
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

const STORAGE_KEY = 'calc-nutricional-history'
const MAX_ENTRIES = 20

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setEntries(JSON.parse(stored))
    } catch {}
  }, [])

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
    }
    setEntries(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setEntries([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return (
    <HistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error('useHistory debe usarse dentro de HistoryProvider')
  return ctx
}
