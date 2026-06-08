'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ClipboardList } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculatePlanAlimentario, type PlanAlimentarioResult } from '@/lib/formulas'

const schema = z
  .object({
    kcal: z.number().min(500, 'Mínimo 500 kcal').max(10000, 'Máximo 10.000 kcal'),
    hcPercent: z.number().min(0).max(100),
    proteinPercent: z.number().min(0).max(100),
    fatPercent: z.number().min(0).max(100),
  })
  .refine(
    data => Math.abs(data.hcPercent + data.proteinPercent + data.fatPercent - 100) < 0.01,
    { message: 'Los porcentajes deben sumar exactamente 100%', path: ['hcPercent'] }
  )
type FormData = z.infer<typeof schema>

const macros = [
  { key: 'hc' as const, label: 'Hidratos de carbono', color: 'bg-yellow-400', kcalPerG: 4 },
  { key: 'protein' as const, label: 'Proteínas', color: 'bg-blue-400', kcalPerG: 4 },
  { key: 'fat' as const, label: 'Grasas', color: 'bg-red-400', kcalPerG: 9 },
]

export default function PlanAlimentarioPage() {
  const [result, setResult] = useState<PlanAlimentarioResult | null>(null)
  const [totalKcal, setTotalKcal] = useState<number>(0)
  const { addEntry } = useHistory()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hcPercent: 55, proteinPercent: 20, fatPercent: 25 },
  })

  const [hc, protein, fat] = watch(['hcPercent', 'proteinPercent', 'fatPercent'])
  const sum = (Number(hc) || 0) + (Number(protein) || 0) + (Number(fat) || 0)

  function onSubmit(data: FormData) {
    const res = calculatePlanAlimentario(data.kcal, data.hcPercent, data.proteinPercent, data.fatPercent)
    setResult(res)
    setTotalKcal(data.kcal)
    addEntry({
      calculatorName: 'Plan Alimentario',
      summary: `${data.kcal} kcal | HC:${data.hcPercent}% P:${data.proteinPercent}% G:${data.fatPercent}%`,
      result: `HC: ${res.hcGrams}g | P: ${res.proteinGrams}g | G: ${res.fatGrams}g`,
    })
  }

  return (
    <CalculatorWrapper
      title="Plan Alimentario"
      description="Calcula los gramos de cada macronutriente a partir del valor calórico total y los porcentajes de distribución."
      icon={ClipboardList}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="kcal">Valor calórico total (kcal)</Label>
              <Input id="kcal" type="number" step="10" placeholder="2000" {...register('kcal', { valueAsNumber: true })} />
              {errors.kcal && <p className="text-xs text-destructive">{errors.kcal.message}</p>}
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="hcPercent">% HC</Label>
                <Input id="hcPercent" type="number" step="1" placeholder="55" {...register('hcPercent', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="proteinPercent">% Proteínas</Label>
                <Input id="proteinPercent" type="number" step="1" placeholder="20" {...register('proteinPercent', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fatPercent">% Grasas</Label>
                <Input id="fatPercent" type="number" step="1" placeholder="25" {...register('fatPercent', { valueAsNumber: true })} />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Suma de porcentajes:</span>
              <span className={sum === 100 ? 'text-green-600 font-semibold' : 'text-destructive font-semibold'}>
                {sum}%
              </span>
            </div>
            {errors.hcPercent?.message?.includes('100') && (
              <p className="text-xs text-destructive">{errors.hcPercent.message}</p>
            )}
            <Button type="submit" className="w-full" disabled={sum !== 100}>
              Calcular plan
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <p className="text-xs text-muted-foreground">Plan para <span className="font-semibold text-foreground">{totalKcal} kcal/día</span></p>
            <div className="space-y-3">
              {[
                { label: 'Hidratos de carbono', grams: result.hcGrams, kcal: result.hcKcal, color: 'bg-yellow-400' },
                { label: 'Proteínas', grams: result.proteinGrams, kcal: result.proteinKcal, color: 'bg-blue-400' },
                { label: 'Grasas', grams: result.fatGrams, kcal: result.fatKcal, color: 'bg-red-400' },
              ].map(macro => (
                <div key={macro.label} className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                  <div className={`h-3 w-3 rounded-full shrink-0 ${macro.color}`} />
                  <span className="text-sm flex-1">{macro.label}</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary">{macro.grams}</span>
                    <span className="text-xs text-muted-foreground ml-1">g</span>
                    <p className="text-xs text-muted-foreground">{macro.kcal} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
