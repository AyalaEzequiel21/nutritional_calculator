'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Flame } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { CalculatorWrapper } from '@/components/calculators/calculator-wrapper'
import { useHistory } from '@/context/history-context'
import { calculateHarrisBenedict, ACTIVITY_FACTORS, type HarrisBenedictResult } from '@/lib/formulas'
import { cn } from '@/lib/utils'

const schema = z.object({
  weight: z.number().positive('Debe ser positivo').max(300),
  height: z.number().min(50, 'Mínimo 50 cm').max(250, 'Máximo 250 cm'),
  age: z.number().min(1, 'Mínimo 1 año').max(120, 'Máximo 120 años'),
})
type FormData = z.infer<typeof schema>

export default function HarrisBenedictPage() {
  const [result, setResult] = useState<HarrisBenedictResult | null>(null)
  const [gender, setGender] = useState<'M' | 'F'>('M')
  const [activityFactor, setActivityFactor] = useState('1.55')
  const { addEntry } = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    const res = calculateHarrisBenedict(data.weight, data.height, data.age, gender, parseFloat(activityFactor))
    setResult(res)
    addEntry({
      calculatorName: 'Harris-Benedict',
      summary: `${data.weight}kg / ${data.height}cm / ${data.age}a`,
      result: `TMB: ${res.tmb} kcal | GET: ${res.get} kcal`,
    })
  }

  const selectedActivity = ACTIVITY_FACTORS.find(f => f.value === activityFactor)

  return (
    <CalculatorWrapper
      title="Ecuación de Harris-Benedict"
      description="Calcula la Tasa Metabólica Basal (TMB) y el Gasto Energético Total (GET) según actividad física."
      icon={Flame}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="age">Edad (años)</Label>
                <Input id="age" type="number" step="1" placeholder="30" {...register('age', { valueAsNumber: true })} />
                {errors.age && <p className="text-xs text-destructive">{errors.age.message}</p>}
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
            </div>

            <div className="space-y-1.5">
              <Label>Nivel de actividad física</Label>
              <div className="grid gap-1.5">
                {ACTIVITY_FACTORS.map(f => {
                  const active = activityFactor === f.value
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setActivityFactor(f.value)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2.5 rounded-md border text-left transition-all',
                        active
                          ? 'border-primary bg-primary/8 ring-1 ring-primary/20'
                          : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40'
                      )}
                    >
                      <div className="min-w-0">
                        <p className={cn('text-sm font-medium leading-tight', active ? 'text-primary' : 'text-foreground')}>
                          {f.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                      </div>
                      <span className={cn(
                        'text-xs font-mono font-bold ml-3 shrink-0 px-1.5 py-0.5 rounded',
                        active ? 'bg-primary/12 text-primary' : 'bg-muted text-muted-foreground'
                      )}>
                        ×{f.value}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <Button type="submit" className="w-full">Calcular</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">TMB (Tasa Metabólica Basal)</p>
                <p className="text-3xl font-bold text-primary">{result.tmb}</p>
                <p className="text-xs text-muted-foreground">kcal/día</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">GET (Gasto Energético Total)</p>
                <p className="text-3xl font-bold text-primary">{result.get}</p>
                <p className="text-xs text-muted-foreground">kcal/día</p>
              </div>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              GET = TMB × {activityFactor} ({selectedActivity?.label})
            </p>
          </CardContent>
        </Card>
      )}
    </CalculatorWrapper>
  )
}
