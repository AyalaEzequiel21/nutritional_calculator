import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Activity, User, UserCheck, Flame, Calculator,
  BarChart2, TrendingDown, ClipboardList, Utensils, ArrowRight,
} from 'lucide-react'

const calculators = [
  {
    href: '/calculadoras/imc',
    icon: Activity,
    title: 'IMC',
    description: 'Índice de masa corporal con clasificación por rangos',
  },
  {
    href: '/calculadoras/peso-ideal',
    icon: User,
    title: 'Peso ideal (Hamwi)',
    description: 'Peso ideal según talla y sexo por fórmula de Hamwi',
  },
  {
    href: '/calculadoras/peso-corregido',
    icon: UserCheck,
    title: 'Peso ideal corregido',
    description: 'Peso ideal corregido para pacientes con obesidad',
  },
  {
    href: '/calculadoras/harris-benedict',
    icon: Flame,
    title: 'Harris-Benedict',
    description: 'Tasa metabólica basal y gasto energético total',
  },
  {
    href: '/calculadoras/formula-desarrollada',
    icon: Calculator,
    title: 'Fórmula desarrollada',
    description: 'Calorías totales a partir de gramos de macronutrientes',
  },
  {
    href: '/calculadoras/porcentaje-peso-usual',
    icon: BarChart2,
    title: '% Peso usual',
    description: 'Porcentaje del peso actual respecto al peso habitual',
  },
  {
    href: '/calculadoras/perdida-peso',
    icon: TrendingDown,
    title: '% Pérdida de peso',
    description: 'Porcentaje de pérdida de peso con interpretación clínica',
  },
  {
    href: '/calculadoras/plan-alimentario',
    icon: ClipboardList,
    title: 'Plan alimentario',
    description: 'Gramos de cada macro a partir de kcal y porcentajes',
    badge: 'Nuevo',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calculadora Nutricional</h1>
        <p className="text-muted-foreground max-w-xl">
          Herramientas de cálculo clínico para profesionales de la nutrición. Calculadoras validadas con interpretación de resultados y registro de historial por sesión.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Calculadoras clínicas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {calculators.map(calc => (
            <Link key={calc.href} href={calc.href} className="group block">
              <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-sm hover:shadow-primary/10">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        <calc.icon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-semibold">{calc.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {calc.badge && (
                        <Badge className="text-[10px] px-1.5 py-0 bg-accent text-accent-foreground">
                          {calc.badge}
                        </Badge>
                      )}
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">{calc.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Referencia
        </h2>
        <Link href="/alimentos" className="group block">
          <Card className="transition-all duration-200 hover:border-primary/50 hover:shadow-sm hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30 group-hover:bg-accent/50 transition-colors">
                  <Utensils className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">Tabla de alimentos</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    66 alimentos con valores de HC, proteínas y grasas por 100g. Buscador, filtro por categoría y calculadora de porciones.
                  </CardDescription>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors ml-auto shrink-0" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </section>
    </div>
  )
}
