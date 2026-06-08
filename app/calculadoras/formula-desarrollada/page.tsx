'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculateFormulaDesarrollada, type MacroKcalResult } from '@/lib/formulas'

const schema = z.object({
  hc: z.number().min(0, 'Mínimo 0').max(2000),
  protein: z.number().min(0, 'Mínimo 0').max(1000),
  fat: z.number().min(0, 'Mínimo 0').max(500),
})
type FormData = z.infer<typeof schema>

const macroColors = {
  hc: 'bg-yellow-400',
  protein: 'bg-blue-400',
  fat: 'bg-red-400',
}

export default function FormulaDesarrolladaPage() {
  const [result, setResult] = useState<MacroKcalResult | null>(null)
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const res = calculateFormulaDesarrollada(data.hc, data.protein, data.fat)
    setResult(res)
    addEntry({
      calculatorName: 'Fórmula Desarrollada',
      summary: `HC: ${data.hc}g / P: ${data.protein}g / G: ${data.fat}g`,
      result: `Total: ${res.total} kcal`,
    })
  }

  return (
    <CalculatorWrapper
      title="Fórmula Desarrollada"
      description="Calcula las kilocalorías totales a partir de los gramos de hidratos de carbono, proteínas y grasas."
      icon={Calculator}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="hc">Hidratos de carbono (g)</Label>
              <Input id="hc" type="number" step="0.1" placeholder="250" {...register('hc', { valueAsNumber: true })} />
              {errors.hc && <p className="text-xs text-destructive">{errors.hc.message}</p>}
              <p className="text-xs text-muted-foreground">4 kcal por gramo</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="protein">Proteínas (g)</Label>
              <Input id="protein" type="number" step="0.1" placeholder="80" {...register('protein', { valueAsNumber: true })} />
              {errors.protein && <p className="text-xs text-destructive">{errors.protein.message}</p>}
              <p className="text-xs text-muted-foreground">4 kcal por gramo</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fat">Grasas (g)</Label>
              <Input id="fat" type="number" step="0.1" placeholder="70" {...register('fat', { valueAsNumber: true })} />
              {errors.fat && <p className="text-xs text-destructive">{errors.fat.message}</p>}
              <p className="text-xs text-muted-foreground">9 kcal por gramo</p>
            </div>
            <Button type="submit" className="w-full">Calcular kilocalorías</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total de kilocalorías</p>
              <p className="text-4xl font-bold text-primary">{result.total} <span className="text-lg font-normal text-muted-foreground">kcal</span></p>
            </div>
            <Separator />
            <div className="space-y-2">
              {[
                { label: 'Hidratos de carbono', kcal: result.hcKcal, color: macroColors.hc },
                { label: 'Proteínas', kcal: result.proteinKcal, color: macroColors.protein },
                { label: 'Grasas', kcal: result.fatKcal, color: macroColors.fat },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.color}`} />
                  <span className="text-sm text-muted-foreground flex-1">{item.label}</span>
                  <span className="text-sm font-medium">{item.kcal} kcal</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {result.total > 0 ? `${((item.kcal / result.total) * 100).toFixed(0)}%` : '0%'}
                  </span>
                </div>
              ))}
            </div>
            {result.total > 0 && (
              <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5">
                <div className={`${macroColors.hc} h-full rounded-l-full`} style={{ width: `${(result.hcKcal / result.total) * 100}%` }} />
                <div className={`${macroColors.protein} h-full`} style={{ width: `${(result.proteinKcal / result.total) * 100}%` }} />
                <div className={`${macroColors.fat} h-full rounded-r-full`} style={{ width: `${(result.fatKcal / result.total) * 100}%` }} />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
