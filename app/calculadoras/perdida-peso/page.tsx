'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculateWeightLossPercent, getWeightLossInterpretation } from '@/lib/formulas'
import { cn } from '@/lib/utils'

const schema = z.object({
  habitualWeight: z.number().positive('Debe ser positivo').max(300),
  currentWeight: z.number().positive('Debe ser positivo').max(300),
})
type FormData = z.infer<typeof schema>

interface Result {
  percent: number
  interpretation: { label: string; color: string }
  lost: number
}

export default function PerdidaPesoPage() {
  const [result, setResult] = useState<Result | null>(null)
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const percent = calculateWeightLossPercent(data.habitualWeight, data.currentWeight)
    const interpretation = getWeightLossInterpretation(percent)
    const lost = parseFloat((data.habitualWeight - data.currentWeight).toFixed(2))
    setResult({ percent, interpretation, lost })
    addEntry({
      calculatorName: '% Pérdida de Peso',
      summary: `PH: ${data.habitualWeight}kg / PA: ${data.currentWeight}kg`,
      result: `Pérdida: ${percent}% – ${interpretation.label}`,
    })
  }

  return (
    <CalculatorWrapper
      title="Porcentaje de Pérdida de Peso"
      description="Calcula el porcentaje de pérdida de peso respecto al peso habitual con interpretación clínica."
      icon={TrendingDown}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="habitualWeight">Peso habitual (kg)</Label>
              <Input id="habitualWeight" type="number" step="0.1" placeholder="80" {...register('habitualWeight', { valueAsNumber: true })} />
              {errors.habitualWeight && <p className="text-xs text-destructive">{errors.habitualWeight.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="currentWeight">Peso actual (kg)</Label>
              <Input id="currentWeight" type="number" step="0.1" placeholder="70" {...register('currentWeight', { valueAsNumber: true })} />
              {errors.currentWeight && <p className="text-xs text-destructive">{errors.currentWeight.message}</p>}
            </div>
            <Button type="submit" className="w-full">Calcular pérdida</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Porcentaje de pérdida</p>
                <p className="text-4xl font-bold text-primary">{result.percent}<span className="text-lg font-normal text-muted-foreground">%</span></p>
                <p className="text-sm text-muted-foreground mt-1">{result.lost > 0 ? `−${result.lost} kg` : `+${Math.abs(result.lost)} kg`}</p>
              </div>
              <span className={cn('text-sm font-semibold', result.interpretation.color)}>
                {result.interpretation.label}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[10px] text-center text-muted-foreground">
              {[
                { range: '0%', label: 'Sin pérdida', color: 'bg-green-400' },
                { range: '1–4%', label: 'Leve', color: 'bg-yellow-400' },
                { range: '5–9%', label: 'Significativa', color: 'bg-orange-400' },
                { range: '10–19%', label: 'Grave', color: 'bg-red-400' },
                { range: '≥ 20%', label: 'Muy grave', color: 'bg-red-700' },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className={`h-1.5 rounded ${item.color}`} />
                  <span>{item.range}</span>
                  <span className="text-[9px] block">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
