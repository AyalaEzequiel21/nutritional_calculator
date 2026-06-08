'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export function MobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const current = NAV_ITEMS.find(item => item.href === pathname)

  return (
    <header className="lg:hidden flex items-center gap-3 border-b border-border bg-background px-4 py-3 sticky top-0 z-10">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground shrink-0">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar">
          <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              CN
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">Calc. Nutricional</p>
              <p className="text-xs text-muted-foreground">Herramientas clínicas</p>
            </div>
          </div>
          <nav className="px-3 py-4 space-y-0.5">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    active
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 min-w-0">
        {current && <current.icon className="h-4 w-4 text-primary shrink-0" />}
        <h1 className="text-sm font-semibold truncate">{current?.label ?? 'Calculadora Nutricional'}</h1>
      </div>
    </header>
  )
}
