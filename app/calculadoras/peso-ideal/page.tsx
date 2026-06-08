'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculateHamwi } from '@/lib/formulas'

const schema = z.object({
  height: z.number().min(100, 'Mínimo 100 cm').max(250, 'Máximo 250 cm'),
})
type FormData = z.infer<typeof schema>

export default function PesoIdealPage() {
  const [result, setResult] = useState<number | null>(null)
  const [gender, setGender] = useState<'M' | 'F'>('M')
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const res = calculateHamwi(data.height, gender)
    setResult(res)
    addEntry({
      calculatorName: 'Peso Ideal (Hamwi)',
      summary: `${data.height}cm / ${gender === 'M' ? 'Masculino' : 'Femenino'}`,
      result: `Peso ideal: ${res} kg`,
    })
  }

  return (
    <CalculatorWrapper
      title="Peso Ideal según Hamwi"
      description="Calcula el peso ideal en función de la talla y el sexo biológico usando la fórmula de Hamwi."
      icon={User}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="height">Talla (cm)</Label>
              <Input id="height" type="number" step="1" placeholder="170" {...register('height', { valueAsNumber: true })} />
              {errors.height && <p className="text-xs text-destructive">{errors.height.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Sexo biológico</Label>
              <Select onValueChange={v => v && setGender(v as 'M' | 'F')} defaultValue="M">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Calcular peso ideal</Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground mb-1">Peso ideal (Hamwi)</p>
            <p className="text-4xl font-bold text-primary">{result} <span className="text-lg font-normal text-muted-foreground">kg</span></p>
            <p className="text-xs text-muted-foreground mt-3">
              Fórmula de Hamwi: base de {gender === 'M' ? '48 kg (hombre)' : '45.5 kg (mujer)'} + corrección por talla.
            </p>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
