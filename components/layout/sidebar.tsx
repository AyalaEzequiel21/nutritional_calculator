'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useHistory } from '@/context/history-context'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Home, Activity, User, UserCheck, Flame, Calculator,
  BarChart2, TrendingDown, ClipboardList, Utensils, Trash2, History,
} from 'lucide-react'

export const NAV_ITEMS = [
  { href: '/',                                      label: 'Inicio',                  icon: Home },
  { href: '/calculadoras/imc',                      label: 'IMC',                     icon: Activity },
  { href: '/calculadoras/peso-ideal',               label: 'Peso ideal (Hamwi)',       icon: User },
  { href: '/calculadoras/peso-corregido',           label: 'Peso ideal corregido',     icon: UserCheck },
  { href: '/calculadoras/harris-benedict',          label: 'Harris-Benedict',          icon: Flame },
  { href: '/calculadoras/formula-desarrollada',     label: 'Fórmula desarrollada',     icon: Calculator },
  { href: '/calculadoras/porcentaje-peso-usual',    label: '% Peso usual',             icon: BarChart2 },
  { href: '/calculadoras/perdida-peso',             label: '% Pérdida de peso',        icon: TrendingDown },
  { href: '/calculadoras/plan-alimentario',         label: 'Plan alimentario',         icon: ClipboardList },
  { href: '/alimentos',                             label: 'Tabla de alimentos',       icon: Utensils },
  { href: '/historial',                             label: 'Historial',                icon: History },
]

export function Sidebar() {
  const pathname = usePathname()
  const { entries, clearHistory } = useHistory()

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          CN
        </div>
        <div>
          <p className="text-sm font-semibold text-sidebar-foreground">Calc. Nutricional</p>
          <p className="text-xs text-muted-foreground">Herramientas clínicas</p>
        </div>
      </div>

      {/* Nav — fixed, always visible */}
      <nav className="px-3 py-4 space-y-0.5 shrink-0">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors font-medium',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* History — takes remaining space with its own scroll */}
      {entries.length > 0 && (
        <>
          <Separator className="mx-3 shrink-0" />
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
              <span className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                Sesión actual
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-muted-foreground hover:text-destructive"
                onClick={clearHistory}
                title="Limpiar historial"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
              <div className="space-y-1">
                {entries.map(entry => (
                  <div
                    key={entry.id}
                    className="px-2 py-1.5 rounded-md bg-sidebar-accent/50 space-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-sidebar-foreground truncate">
                        {entry.calculatorName}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1 py-0 shrink-0">
                        {formatRelativeTime(entry.timestamp)}
                      </Badge>
                    </div>
                    <p className="text-xs text-sidebar-foreground/70 truncate">{entry.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
