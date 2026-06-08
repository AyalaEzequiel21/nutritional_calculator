'use client'

import { useHistory, type HistoryEntry } from '@/context/history-context'
import { formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Activity, User, UserCheck, Flame, Calculator,
  BarChart2, TrendingDown, ClipboardList, History, Trash2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  'IMC': Activity,
  'Peso ideal (Hamwi)': User,
  'Peso ideal corregido': UserCheck,
  'Harris-Benedict': Flame,
  'Fórmula desarrollada': Calculator,
  '% Peso usual': BarChart2,
  '% Pérdida de peso': TrendingDown,
  'Plan alimentario': ClipboardList,
}

const COLOR_MAP: Record<string, string> = {
  'IMC': 'bg-blue-500/15 text-blue-600',
  'Peso ideal (Hamwi)': 'bg-emerald-500/15 text-emerald-600',
  'Peso ideal corregido': 'bg-teal-500/15 text-teal-600',
  'Harris-Benedict': 'bg-orange-500/15 text-orange-600',
  'Fórmula desarrollada': 'bg-violet-500/15 text-violet-600',
  '% Peso usual': 'bg-sky-500/15 text-sky-600',
  '% Pérdida de peso': 'bg-red-500/15 text-red-600',
  'Plan alimentario': 'bg-green-500/15 text-green-600',
}

function EntryCard({ entry }: { entry: HistoryEntry }) {
  const Icon = ICON_MAP[entry.calculatorName] ?? Calculator
  const colorClass = COLOR_MAP[entry.calculatorName] ?? 'bg-primary/15 text-primary'

  const resultParts = entry.result.split('|').map(p => p.trim())

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-semibold">{entry.calculatorName}</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                {formatRelativeTime(entry.timestamp)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{entry.summary}</p>
            <div className="flex flex-wrap gap-2">
              {resultParts.map((part, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-foreground"
                >
                  {part}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HistorialPage() {
  const { entries, clearHistory } = useHistory()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/20">
              <History className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Historial</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-11">
            {entries.length === 0
              ? 'Sin registros en esta sesión'
              : `${entries.length} cálculo${entries.length !== 1 ? 's' : ''} en esta sesión`}
          </p>
        </div>
        {entries.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="shrink-0 gap-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpiar todo
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <Card className="border-dashed border-border/50">
          <CardContent className="py-16 text-center">
            <History className="h-10 w-10 mx-auto mb-4 text-muted-foreground/25" />
            <p className="text-sm font-medium text-muted-foreground">No hay cálculos registrados aún</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Los resultados de cada calculadora se guardan automáticamente aquí.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(
              entries.reduce<Record<string, number>>((acc, e) => {
                acc[e.calculatorName] = (acc[e.calculatorName] ?? 0) + 1
                return acc
              }, {})
            )
              .sort(([, a], [, b]) => b - a)
              .slice(0, 4)
              .map(([name, count]) => {
                const Icon = ICON_MAP[name] ?? Calculator
                const colorClass = COLOR_MAP[name] ?? 'bg-primary/15 text-primary'
                return (
                  <div key={name} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-card border border-border/50">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${colorClass}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{name}</p>
                      <p className="text-sm font-bold">{count}×</p>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Entry list */}
          <div className="space-y-2.5">
            {entries.map(entry => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
