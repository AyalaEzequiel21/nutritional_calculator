'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import {
  calculateIMC,
  getIMCClassification,
  type IMCClassification,
} from '@/lib/formulas'
import { cn } from '@/lib/utils'

const schema = z.object({
  weight: z.number().positive('Debe ser positivo').max(300, 'Valor fuera de rango'),
  height: z.number().min(50, 'Mínimo 50 cm').max(250, 'Máximo 250 cm'),
})
type FormData = z.infer<typeof schema>

interface Result {
  imc: number
  classification: IMCClassification
}

const IMC_ZONES = [
  { label: 'Bajo peso', color: 'bg-blue-400', width: '18%' },
  { label: 'Normal', color: 'bg-green-400', width: '22%' },
  { label: 'Sobrepeso', color: 'bg-yellow-400', width: '18%' },
  { label: 'Obesidad I', color: 'bg-orange-400', width: '16%' },
  { label: 'Obesidad II', color: 'bg-red-400', width: '14%' },
  { label: 'Obesidad III', color: 'bg-red-600', width: '12%' },
]

export default function IMCPage() {
  const [result, setResult] = useState<Result | null>(null)
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const imc = calculateIMC(data.weight, data.height)
    const classification = getIMCClassification(imc)
    setResult({ imc, classification })
    addEntry({
      calculatorName: 'IMC',
      summary: `${data.weight}kg / ${data.height}cm`,
      result: `IMC: ${imc} – ${classification.label}`,
    })
  }

  return (
    <CalculatorWrapper
      title="Índice de Masa Corporal"
      description="Calcula el IMC y clasifica el estado nutricional según los criterios de la OMS."
      icon={Activity}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" step="0.1" placeholder="70" {...register('weight', { valueAsNumber: true })} />
                {errors.weight && <p className="text-xs text-destructive">{errors.weight.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="height">Talla (cm)</Label>
                <Input id="height" type="number" step="1" placeholder="170" {...register('height', { valueAsNumber: true })} />
                {errors.height && <p className="text-xs text-destructive">{errors.height.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full">Calcular IMC</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className={cn('border', result.classification.borderColor, result.classification.bgColor)}>
          <CardContent className="pt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Resultado</p>
                <p className="text-4xl font-bold tracking-tight">{result.imc}</p>
                <p className="text-sm text-muted-foreground mt-0.5">kg/m²</p>
              </div>
              <Badge className={cn('text-sm px-3 py-1', result.classification.color, result.classification.bgColor, 'border', result.classification.borderColor)}>
                {result.classification.label}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex h-4 w-full rounded-full overflow-hidden gap-0.5">
                {IMC_ZONES.map(zone => (
                  <div key={zone.label} className={cn('h-full rounded-sm', zone.color)} style={{ width: zone.width }} />
                ))}
              </div>
              <div className="relative h-4">
                <div
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${Math.min(Math.max(result.classification.position, 1), 97)}%` }}
                >
                  <div className="w-0.5 h-3 bg-foreground/70 rounded" />
                  <span className="text-xs font-semibold text-foreground/70">{result.imc}</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40+</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {IMC_ZONES.map(zone => (
                <div key={zone.label} className="flex items-center gap-1.5">
                  <div className={cn('h-2 w-2 rounded-full shrink-0', zone.color)} />
                  <span className="text-muted-foreground">{zone.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
