export interface IMCClassification {
  label: string
  color: string
  bgColor: string
  borderColor: string
  range: string
  position: number
}

export function calculateIMC(weight: number, height: number): number {
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2))
}

export function getIMCClassification(imc: number): IMCClassification {
  if (imc < 18.5)
    return { label: 'Bajo peso', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', range: '< 18.5', position: Math.min((imc / 18.5) * 18, 18) }
  if (imc < 25)
    return { label: 'Peso normal', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', range: '18.5 – 24.9', position: 18 + ((imc - 18.5) / 6.5) * 22 }
  if (imc < 30)
    return { label: 'Sobrepeso', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', range: '25 – 29.9', position: 40 + ((imc - 25) / 5) * 18 }
  if (imc < 35)
    return { label: 'Obesidad grado I', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', range: '30 – 34.9', position: 58 + ((imc - 30) / 5) * 16 }
  if (imc < 40)
    return { label: 'Obesidad grado II', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', range: '35 – 39.9', position: 74 + ((imc - 35) / 5) * 14 }
  return { label: 'Obesidad grado III', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300', range: '≥ 40', position: 94 }
}

export function calculateHamwi(heightCm: number, gender: 'M' | 'F'): number {
  const inchesOver60 = (heightCm - 152.4) / 2.54
  const base = gender === 'M' ? 48 : 45.5
  const increment = gender === 'M' ? 2.7 : 2.2
  return parseFloat((base + increment * inchesOver60).toFixed(2))
}

export function calculatePIC(currentWeight: number, idealWeight: number): number {
  return parseFloat((idealWeight + 0.25 * (currentWeight - idealWeight)).toFixed(2))
}

export function calculatePPU(currentWeight: number, habitualWeight: number): number {
  return parseFloat(((currentWeight / habitualWeight) * 100).toFixed(2))
}

export function getPPUInterpretation(ppu: number): { label: string; color: string } {
  if (ppu >= 95) return { label: 'Normal', color: 'text-green-600' }
  if (ppu >= 85) return { label: 'Pérdida leve', color: 'text-yellow-600' }
  if (ppu >= 75) return { label: 'Pérdida moderada', color: 'text-orange-600' }
  return { label: 'Pérdida grave', color: 'text-red-600' }
}

export function calculateWeightLossPercent(habitualWeight: number, currentWeight: number): number {
  return parseFloat((((habitualWeight - currentWeight) / habitualWeight) * 100).toFixed(2))
}

export function getWeightLossInterpretation(percent: number): { label: string; color: string } {
  if (percent <= 0) return { label: 'Sin pérdida', color: 'text-green-600' }
  if (percent < 5) return { label: 'Pérdida leve', color: 'text-yellow-600' }
  if (percent < 10) return { label: 'Pérdida significativa', color: 'text-orange-500' }
  if (percent < 20) return { label: 'Pérdida grave', color: 'text-red-500' }
  return { label: 'Pérdida muy grave', color: 'text-red-700' }
}

export interface MacroKcalResult {
  hcKcal: number
  proteinKcal: number
  fatKcal: number
  total: number
}

export function calculateFormulaDesarrollada(
  hcGrams: number,
  proteinGrams: number,
  fatGrams: number
): MacroKcalResult {
  const hcKcal = hcGrams * 4
  const proteinKcal = proteinGrams * 4
  const fatKcal = fatGrams * 9
  return {
    hcKcal: parseFloat(hcKcal.toFixed(1)),
    proteinKcal: parseFloat(proteinKcal.toFixed(1)),
    fatKcal: parseFloat(fatKcal.toFixed(1)),
    total: parseFloat((hcKcal + proteinKcal + fatKcal).toFixed(1)),
  }
}

export interface HarrisBenedictResult {
  tmb: number
  get: number
}

export function calculateHarrisBenedict(
  weight: number,
  height: number,
  age: number,
  gender: 'M' | 'F',
  activityFactor: number
): HarrisBenedictResult {
  const tmb =
    gender === 'M'
      ? 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age
      : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
  return {
    tmb: parseFloat(tmb.toFixed(1)),
    get: parseFloat((tmb * activityFactor).toFixed(1)),
  }
}

export interface PlanAlimentarioResult {
  hcGrams: number
  proteinGrams: number
  fatGrams: number
  hcKcal: number
  proteinKcal: number
  fatKcal: number
}

export function calculatePlanAlimentario(
  totalKcal: number,
  hcPercent: number,
  proteinPercent: number,
  fatPercent: number
): PlanAlimentarioResult {
  const hcKcal = totalKcal * (hcPercent / 100)
  const proteinKcal = totalKcal * (proteinPercent / 100)
  const fatKcal = totalKcal * (fatPercent / 100)
  return {
    hcGrams: parseFloat((hcKcal / 4).toFixed(1)),
    proteinGrams: parseFloat((proteinKcal / 4).toFixed(1)),
    fatGrams: parseFloat((fatKcal / 9).toFixed(1)),
    hcKcal: parseFloat(hcKcal.toFixed(1)),
    proteinKcal: parseFloat(proteinKcal.toFixed(1)),
    fatKcal: parseFloat(fatKcal.toFixed(1)),
  }
}

export const ACTIVITY_FACTORS = [
  { value: '1.2', label: 'Sedentario', description: 'Sin ejercicio o muy poco' },
  { value: '1.375', label: 'Ligeramente activo', description: 'Ejercicio 1–3 días/semana' },
  { value: '1.55', label: 'Moderadamente activo', description: 'Ejercicio 3–5 días/semana' },
  { value: '1.725', label: 'Muy activo', description: 'Ejercicio intenso 6–7 días/semana' },
  { value: '1.9', label: 'Extra activo', description: 'Trabajo físico intenso + ejercicio diario' },
]
