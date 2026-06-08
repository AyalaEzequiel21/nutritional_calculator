'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BarChart2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculatePPU, getPPUInterpretation } from '@/lib/formulas'
import { cn } from '@/lib/utils'

const schema = z.object({
  currentWeight: z.number().positive('Debe ser positivo').max(300),
  habitualWeight: z.number().positive('Debe ser positivo').max(300),
})
type FormData = z.infer<typeof schema>

interface Result {
  ppu: number
  interpretation: { label: string; color: string }
}

export default function PorcentajePesoUsualPage() {
  const [result, setResult] = useState<Result | null>(null)
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const ppu = calculatePPU(data.currentWeight, data.habitualWeight)
    const interpretation = getPPUInterpretation(ppu)
    setResult({ ppu, interpretation })
    addEntry({
      calculatorName: '% Peso Usual',
      summary: `PA: ${data.currentWeight}kg / PH: ${data.habitualWeight}kg`,
      result: `PPU: ${ppu}% – ${interpretation.label}`,
    })
  }

  return (
    <CalculatorWrapper
      title="Porcentaje de Peso Usual"
      description="Evalúa el estado nutricional comparando el peso actual con el peso habitual del paciente."
      icon={BarChart2}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentWeight">Peso actual (kg)</Label>
              <Input id="currentWeight" type="number" step="0.1" placeholder="65" {...register('currentWeight', { valueAsNumber: true })} />
              {errors.currentWeight && <p className="text-xs text-destructive">{errors.currentWeight.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="habitualWeight">Peso habitual (kg)</Label>
              <Input id="habitualWeight" type="number" step="0.1" placeholder="70" {...register('habitualWeight', { valueAsNumber: true })} />
              {errors.habitualWeight && <p className="text-xs text-destructive">{errors.habitualWeight.message}</p>}
            </div>
            <Button type="submit" className="w-full">Calcular PPU</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Porcentaje de peso usual</p>
                <p className="text-4xl font-bold text-primary">{result.ppu}<span className="text-lg font-normal text-muted-foreground">%</span></p>
              </div>
              <span className={cn('text-sm font-semibold', result.interpretation.color)}>
                {result.interpretation.label}
              </span>
            </div>
            <Progress value={Math.min(result.ppu, 110)} className="h-2" />
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center text-muted-foreground">
              <div className="space-y-1">
                <div className="h-1.5 rounded bg-red-400" />
                <span>{'< 75%'}</span>
                <span className="text-[9px]">Grave</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded bg-orange-400" />
                <span>75–84%</span>
                <span className="text-[9px]">Moderada</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded bg-yellow-400" />
                <span>85–94%</span>
                <span className="text-[9px]">Leve</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded bg-green-400" />
                <span>≥ 95%</span>
                <span className="text-[9px]">Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
