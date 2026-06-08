import type { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
}

export function CalculatorWrapper({ title, description, icon: Icon, children }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-11">{description}</p>
      </div>
      {children}
    </div>
  )
}
