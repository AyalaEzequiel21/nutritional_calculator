'use client'

import { useMemo, useState } from 'react'
import { Plus, Search, Trash2, Utensils, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ALIMENTS,
  FOOD_CATEGORIES,
  calculatePortionKcal,
  getKcalPer100g,
  type Aliment,
  type FoodCategory,
} from '@/lib/aliments'

interface PlanItem {
  key: string
  aliment: Aliment
  grams: number
}

const CATEGORY_COLORS: Record<FoodCategory, string> = {
  'Lácteos':              'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Carnes y huevos':      'bg-red-500/15 text-red-400 border-red-500/30',
  'Verduras tipo A':      'bg-green-500/15 text-green-400 border-green-500/30',
  'Verduras tipo B':      'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Cereales y farináceos':'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'Legumbres':            'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Frutas':               'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Grasas':               'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Azúcares y dulces':    'bg-pink-500/15 text-pink-400 border-pink-500/30',
}

export default function AlimentosPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FoodCategory | 'Todas'>('Todas')
  const [selected, setSelected] = useState<Aliment | null>(null)
  const [addGrams, setAddGrams] = useState('100')
  const [plan, setPlan] = useState<PlanItem[]>([])

  const filtered = useMemo(() => {
    return ALIMENTS.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'Todas' || a.category === category
      return matchSearch && matchCat
    })
  }, [search, category])

  function selectFood(aliment: Aliment) {
    if (selected?.id === aliment.id) {
      setSelected(null)
    } else {
      setSelected(aliment)
      setAddGrams('100')
    }
  }

  function addToPlan() {
    if (!selected) return
    const grams = parseFloat(addGrams)
    if (!grams || grams <= 0) return
    setPlan(prev => [...prev, { key: `${selected.id}-${Date.now()}`, aliment: selected, grams }])
    setSelected(null)
    setAddGrams('100')
  }

  function removeFromPlan(key: string) {
    setPlan(prev => prev.filter(p => p.key !== key))
  }

  const planTotals = useMemo(() => {
    return plan.reduce(
      (acc, item) => {
        const r = calculatePortionKcal(item.aliment, item.grams)
        return {
          hcG: acc.hcG + r.hcG,
          proteinG: acc.proteinG + r.proteinG,
          fatG: acc.fatG + r.fatG,
          kcal: acc.kcal + r.total,
        }
      },
      { hcG: 0, proteinG: 0, fatG: 0, kcal: 0 }
    )
  }, [plan])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
            <Utensils className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Tabla de alimentos</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-11">
          Seleccioná alimentos, ingresá la porción y armá tu plan nutricional. {ALIMENTS.length} alimentos disponibles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alimento..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select onValueChange={v => v && setCategory(v as FoodCategory | 'Todas')} defaultValue="Todas">
          <SelectTrigger className="sm:w-52">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas las categorías</SelectItem>
            {FOOD_CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Food table */}
      <div>
        <ScrollArea className="h-[400px] rounded-lg border border-border/50">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Alimento</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">HC /100g</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prot. /100g</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grasas /100g</TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">kcal /100g</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                    Sin resultados para &quot;{search}&quot;
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(aliment => (
                  <TableRow
                    key={aliment.id}
                    className={`cursor-pointer transition-all duration-150 border-border/30 ${
                      selected?.id === aliment.id
                        ? 'bg-primary/12 hover:bg-primary/15'
                        : 'hover:bg-muted/40'
                    }`}
                    onClick={() => selectFood(aliment)}
                  >
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{aliment.name}</p>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[aliment.category]}`}
                        >
                          {aliment.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{aliment.hcPer100g}g</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{aliment.proteinPer100g}g</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{aliment.fatPer100g}g</TableCell>
                    <TableCell className="text-right text-sm font-semibold tabular-nums text-primary">
                      {getKcalPer100g(aliment)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <p className="text-xs text-muted-foreground mt-1.5">
          Valores por 100g — {filtered.length} de {ALIMENTS.length} alimentos. Hacé clic en un alimento para agregarlo al plan.
        </p>
      </div>

      {/* Add to plan strip */}
      {selected && (
        <Card className="border-primary/40 bg-primary/8 shadow-lg shadow-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-sm font-semibold truncate">{selected.name}</span>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 shrink-0 ${CATEGORY_COLORS[selected.category]}`}
                >
                  {selected.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={addGrams}
                    onChange={e => setAddGrams(e.target.value)}
                    className="h-8 w-20 text-center text-sm"
                  />
                  <span className="text-sm text-muted-foreground">g</span>
                </div>
                <Button size="sm" onClick={addToPlan} className="h-8 gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Agregar al plan
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelected(null)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Plan nutricional
            {plan.length > 0 && (
              <span className="ml-2 text-primary normal-case font-bold">{plan.length} {plan.length === 1 ? 'alimento' : 'alimentos'}</span>
            )}
          </h2>
          {plan.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPlan([])}
              className="h-7 text-xs text-muted-foreground hover:text-destructive gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpiar plan
            </Button>
          )}
        </div>

        {plan.length === 0 ? (
          <Card className="border-dashed border-border/40">
            <CardContent className="py-10 text-center">
              <Utensils className="h-8 w-8 mx-auto mb-3 text-muted-foreground/25" />
              <p className="text-sm text-muted-foreground">Tu plan está vacío.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Seleccioná alimentos de la tabla y agregá la porción.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alimento</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gramos</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">HC</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prot.</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grasas</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">kcal</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {plan.map(item => {
                  const r = calculatePortionKcal(item.aliment, item.grams)
                  return (
                    <TableRow key={item.key} className="border-border/25 hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{item.aliment.name}</p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[item.aliment.category]}`}
                          >
                            {item.aliment.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm tabular-nums font-medium">{item.grams}g</TableCell>
                      <TableCell className="text-right text-sm tabular-nums">{r.hcG}g</TableCell>
                      <TableCell className="text-right text-sm tabular-nums">{r.proteinG}g</TableCell>
                      <TableCell className="text-right text-sm tabular-nums">{r.fatG}g</TableCell>
                      <TableCell className="text-right text-sm font-semibold tabular-nums text-primary">{r.total}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => removeFromPlan(item.key)}
                          className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-auto"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* Totals row */}
            <div className="border-t border-border/40 bg-primary/10 px-4 py-4">
              <div className="flex items-center gap-4 flex-wrap justify-between">
                <span className="text-sm font-bold">Total del plan</span>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-0.5">Hidratos</p>
                    <p className="text-sm font-semibold tabular-nums">{planTotals.hcG.toFixed(1)}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-0.5">Proteínas</p>
                    <p className="text-sm font-semibold tabular-nums">{planTotals.proteinG.toFixed(1)}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-0.5">Grasas</p>
                    <p className="text-sm font-semibold tabular-nums">{planTotals.fatG.toFixed(1)}g</p>
                  </div>
                  <div className="text-center pl-4 border-l border-border/40">
                    <p className="text-xs text-muted-foreground mb-0.5">Total kcal</p>
                    <p className="text-2xl font-bold text-primary tabular-nums">{planTotals.kcal.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
