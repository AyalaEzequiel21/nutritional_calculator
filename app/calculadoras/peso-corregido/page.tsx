'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculatePIC } from '@/lib/formulas'

const schema = z.object({
  currentWeight: z.number().positive('Debe ser positivo').max(300),
  idealWeight: z.number().positive('Debe ser positivo').max(200),
})
type FormData = z.infer<typeof schema>

export default function PesoCorregidoPage() {
  const [result, setResult] = useState<number | null>(null)
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const res = calculatePIC(data.currentWeight, data.idealWeight)
    setResult(res)
    addEntry({
      calculatorName: 'Peso Ideal Corregido',
      summary: `PA: ${data.currentWeight}kg / PI: ${data.idealWeight}kg`,
      result: `PIC: ${res} kg`,
    })
  }

  return (
    <CalculatorWrapper
      title="Peso Ideal Corregido"
      description="Calcula el peso ideal corregido (PIC) para pacientes con obesidad, usando el 25% de la diferencia entre el peso actual y el ideal."
      icon={UserCheck}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentWeight">Peso actual (kg)</Label>
              <Input id="currentWeight" type="number" step="0.1" placeholder="95" {...register('currentWeight', { valueAsNumber: true })} />
              {errors.currentWeight && <p className="text-xs text-destructive">{errors.currentWeight.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="idealWeight">Peso ideal (kg)</Label>
              <Input id="idealWeight" type="number" step="0.1" placeholder="70" {...register('idealWeight', { valueAsNumber: true })} />
              {errors.idealWeight && <p className="text-xs text-destructive">{errors.idealWeight.message}</p>}
            </div>
            <Button type="submit" className="w-full">Calcular PIC</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground mb-1">Peso ideal corregido</p>
            <p className="text-4xl font-bold text-primary">{result} <span className="text-lg font-normal text-muted-foreground">kg</span></p>
            <p className="text-xs text-muted-foreground mt-3">
              PIC = Peso ideal + 0.25 × (Peso actual − Peso ideal)
            </p>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
