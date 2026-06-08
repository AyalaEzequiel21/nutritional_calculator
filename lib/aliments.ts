export type FoodCategory =
  | 'Lácteos'
  | 'Carnes y huevos'
  | 'Verduras tipo A'
  | 'Verduras tipo B'
  | 'Cereales y farináceos'
  | 'Legumbres'
  | 'Frutas'
  | 'Grasas'
  | 'Azúcares y dulces'

export interface Aliment {
  id: number
  name: string
  category: FoodCategory
  hcPer100g: number
  proteinPer100g: number
  fatPer100g: number
}

export function getKcalPer100g(a: Aliment): number {
  return parseFloat((a.hcPer100g * 4 + a.proteinPer100g * 4 + a.fatPer100g * 9).toFixed(1))
}

export function calculatePortionKcal(a: Aliment, grams: number) {
  const f = grams / 100
  const hcKcal = a.hcPer100g * f * 4
  const proteinKcal = a.proteinPer100g * f * 4
  const fatKcal = a.fatPer100g * f * 9
  return {
    hcG: parseFloat((a.hcPer100g * f).toFixed(1)),
    proteinG: parseFloat((a.proteinPer100g * f).toFixed(1)),
    fatG: parseFloat((a.fatPer100g * f).toFixed(1)),
    hcKcal: parseFloat(hcKcal.toFixed(1)),
    proteinKcal: parseFloat(proteinKcal.toFixed(1)),
    fatKcal: parseFloat(fatKcal.toFixed(1)),
    total: parseFloat((hcKcal + proteinKcal + fatKcal).toFixed(1)),
  }
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  'Lácteos',
  'Carnes y huevos',
  'Verduras tipo A',
  'Verduras tipo B',
  'Cereales y farináceos',
  'Legumbres',
  'Frutas',
  'Grasas',
  'Azúcares y dulces',
]

export const ALIMENTS: Aliment[] = [
  // Lácteos
  { id: 1,  name: 'Leche entera',                   category: 'Lácteos',             hcPer100g: 4.8,  proteinPer100g: 3.2,  fatPer100g: 3.5  },
  { id: 2,  name: 'Leche descremada',                category: 'Lácteos',             hcPer100g: 5.0,  proteinPer100g: 3.4,  fatPer100g: 0.1  },
  { id: 3,  name: 'Yogur entero natural',             category: 'Lácteos',             hcPer100g: 4.7,  proteinPer100g: 3.8,  fatPer100g: 3.3  },
  { id: 4,  name: 'Yogur descremado',                category: 'Lácteos',             hcPer100g: 5.5,  proteinPer100g: 5.0,  fatPer100g: 0.4  },
  { id: 5,  name: 'Queso port salut',                category: 'Lácteos',             hcPer100g: 1.5,  proteinPer100g: 20.0, fatPer100g: 22.0 },
  { id: 6,  name: 'Queso tybo',                      category: 'Lácteos',             hcPer100g: 0.5,  proteinPer100g: 25.0, fatPer100g: 26.0 },
  { id: 7,  name: 'Queso duro (parmesano)',           category: 'Lácteos',             hcPer100g: 0.0,  proteinPer100g: 35.0, fatPer100g: 28.0 },
  { id: 8,  name: 'Queso untable (tipo crema)',       category: 'Lácteos',             hcPer100g: 3.0,  proteinPer100g: 8.5,  fatPer100g: 25.0 },
  { id: 9,  name: 'Ricota',                          category: 'Lácteos',             hcPer100g: 3.5,  proteinPer100g: 11.0, fatPer100g: 10.0 },
  { id: 10, name: 'Crema de leche',                  category: 'Lácteos',             hcPer100g: 3.3,  proteinPer100g: 2.4,  fatPer100g: 35.0 },

  // Carnes y huevos
  { id: 11, name: 'Huevo entero',                    category: 'Carnes y huevos',     hcPer100g: 0.6,  proteinPer100g: 12.5, fatPer100g: 10.0 },
  { id: 12, name: 'Clara de huevo',                  category: 'Carnes y huevos',     hcPer100g: 0.7,  proteinPer100g: 11.0, fatPer100g: 0.0  },
  { id: 13, name: 'Carne vacuna magra (lomo)',        category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 22.0, fatPer100g: 5.0  },
  { id: 14, name: 'Carne vacuna semigrasosa',         category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 19.0, fatPer100g: 14.0 },
  { id: 15, name: 'Pollo sin piel (pechuga)',         category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 23.0, fatPer100g: 1.9  },
  { id: 16, name: 'Pollo con piel',                  category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 18.0, fatPer100g: 14.0 },
  { id: 17, name: 'Pescado magro (merluza)',          category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 18.0, fatPer100g: 1.5  },
  { id: 18, name: 'Atún en agua (lata)',              category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 25.0, fatPer100g: 1.0  },
  { id: 19, name: 'Cerdo magro',                     category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 21.0, fatPer100g: 6.0  },
  { id: 20, name: 'Salmón',                          category: 'Carnes y huevos',     hcPer100g: 0.0,  proteinPer100g: 20.0, fatPer100g: 12.0 },

  // Verduras tipo A
  { id: 21, name: 'Verduras tipo A (promedio)',       category: 'Verduras tipo A',     hcPer100g: 5.5,  proteinPer100g: 1.5,  fatPer100g: 0.2  },
  { id: 22, name: 'Lechuga',                         category: 'Verduras tipo A',     hcPer100g: 2.9,  proteinPer100g: 1.3,  fatPer100g: 0.2  },
  { id: 23, name: 'Tomate',                          category: 'Verduras tipo A',     hcPer100g: 3.9,  proteinPer100g: 0.9,  fatPer100g: 0.2  },
  { id: 24, name: 'Pepino',                          category: 'Verduras tipo A',     hcPer100g: 3.6,  proteinPer100g: 0.7,  fatPer100g: 0.1  },
  { id: 25, name: 'Espinaca',                        category: 'Verduras tipo A',     hcPer100g: 3.6,  proteinPer100g: 2.9,  fatPer100g: 0.4  },
  { id: 26, name: 'Zapallito',                       category: 'Verduras tipo A',     hcPer100g: 3.1,  proteinPer100g: 1.2,  fatPer100g: 0.1  },
  { id: 27, name: 'Acelga',                          category: 'Verduras tipo A',     hcPer100g: 3.7,  proteinPer100g: 1.8,  fatPer100g: 0.2  },
  { id: 28, name: 'Brócoli',                         category: 'Verduras tipo A',     hcPer100g: 6.6,  proteinPer100g: 2.8,  fatPer100g: 0.4  },

  // Verduras tipo B
  { id: 29, name: 'Verduras tipo B (promedio)',       category: 'Verduras tipo B',     hcPer100g: 20.0, proteinPer100g: 2.5,  fatPer100g: 0.2  },
  { id: 30, name: 'Papa',                            category: 'Verduras tipo B',     hcPer100g: 17.5, proteinPer100g: 2.0,  fatPer100g: 0.1  },
  { id: 31, name: 'Batata',                          category: 'Verduras tipo B',     hcPer100g: 20.5, proteinPer100g: 1.6,  fatPer100g: 0.1  },
  { id: 32, name: 'Mandioca',                        category: 'Verduras tipo B',     hcPer100g: 38.1, proteinPer100g: 1.4,  fatPer100g: 0.3  },
  { id: 33, name: 'Choclo',                          category: 'Verduras tipo B',     hcPer100g: 19.0, proteinPer100g: 3.2,  fatPer100g: 1.2  },
  { id: 34, name: 'Arvejas',                         category: 'Verduras tipo B',     hcPer100g: 14.5, proteinPer100g: 5.4,  fatPer100g: 0.4  },
  { id: 35, name: 'Zanahoria',                       category: 'Verduras tipo B',     hcPer100g: 9.6,  proteinPer100g: 0.9,  fatPer100g: 0.2  },
  { id: 36, name: 'Remolacha',                       category: 'Verduras tipo B',     hcPer100g: 9.6,  proteinPer100g: 1.6,  fatPer100g: 0.1  },

  // Cereales y farináceos
  { id: 37, name: 'Arroz (cocido)',                  category: 'Cereales y farináceos', hcPer100g: 28.0, proteinPer100g: 2.7,  fatPer100g: 0.3  },
  { id: 38, name: 'Arroz (crudo)',                   category: 'Cereales y farináceos', hcPer100g: 77.0, proteinPer100g: 7.0,  fatPer100g: 0.6  },
  { id: 39, name: 'Fideos (cocidos)',                category: 'Cereales y farináceos', hcPer100g: 25.0, proteinPer100g: 3.6,  fatPer100g: 0.5  },
  { id: 40, name: 'Pan blanco',                      category: 'Cereales y farináceos', hcPer100g: 49.0, proteinPer100g: 8.0,  fatPer100g: 2.5  },
  { id: 41, name: 'Pan integral',                    category: 'Cereales y farináceos', hcPer100g: 43.0, proteinPer100g: 9.0,  fatPer100g: 2.5  },
  { id: 42, name: 'Galletitas de agua',              category: 'Cereales y farináceos', hcPer100g: 71.0, proteinPer100g: 9.0,  fatPer100g: 9.0  },
  { id: 43, name: 'Avena',                           category: 'Cereales y farináceos', hcPer100g: 66.0, proteinPer100g: 13.0, fatPer100g: 6.5  },
  { id: 44, name: 'Harina de trigo',                 category: 'Cereales y farináceos', hcPer100g: 76.0, proteinPer100g: 10.0, fatPer100g: 1.0  },

  // Legumbres
  { id: 45, name: 'Lentejas (cocidas)',              category: 'Legumbres',           hcPer100g: 20.0, proteinPer100g: 9.0,  fatPer100g: 0.4  },
  { id: 46, name: 'Garbanzos (cocidos)',             category: 'Legumbres',           hcPer100g: 27.0, proteinPer100g: 9.0,  fatPer100g: 2.6  },
  { id: 47, name: 'Porotos (cocidos)',               category: 'Legumbres',           hcPer100g: 22.0, proteinPer100g: 9.0,  fatPer100g: 0.5  },
  { id: 48, name: 'Soja (cocida)',                   category: 'Legumbres',           hcPer100g: 9.9,  proteinPer100g: 17.0, fatPer100g: 9.0  },

  // Frutas
  { id: 49, name: 'Frutas tipo A (promedio)',        category: 'Frutas',              hcPer100g: 12.0, proteinPer100g: 0.5,  fatPer100g: 0.3  },
  { id: 50, name: 'Manzana',                        category: 'Frutas',              hcPer100g: 13.8, proteinPer100g: 0.3,  fatPer100g: 0.2  },
  { id: 51, name: 'Banana',                         category: 'Frutas',              hcPer100g: 22.8, proteinPer100g: 1.1,  fatPer100g: 0.3  },
  { id: 52, name: 'Naranja',                        category: 'Frutas',              hcPer100g: 11.8, proteinPer100g: 0.9,  fatPer100g: 0.1  },
  { id: 53, name: 'Pera',                           category: 'Frutas',              hcPer100g: 15.2, proteinPer100g: 0.4,  fatPer100g: 0.1  },
  { id: 54, name: 'Uva',                            category: 'Frutas',              hcPer100g: 17.0, proteinPer100g: 0.6,  fatPer100g: 0.2  },

  // Grasas
  { id: 55, name: 'Aceite vegetal',                 category: 'Grasas',              hcPer100g: 0.0,  proteinPer100g: 0.0,  fatPer100g: 100.0 },
  { id: 56, name: 'Manteca',                        category: 'Grasas',              hcPer100g: 0.0,  proteinPer100g: 0.6,  fatPer100g: 81.0 },
  { id: 57, name: 'Margarina',                      category: 'Grasas',              hcPer100g: 0.0,  proteinPer100g: 0.0,  fatPer100g: 80.0 },
  { id: 58, name: 'Maní (sin sal)',                  category: 'Grasas',              hcPer100g: 16.0, proteinPer100g: 26.0, fatPer100g: 49.0 },
  { id: 59, name: 'Nueces',                         category: 'Grasas',              hcPer100g: 14.0, proteinPer100g: 15.0, fatPer100g: 65.0 },
  { id: 60, name: 'Almendras',                      category: 'Grasas',              hcPer100g: 22.0, proteinPer100g: 21.0, fatPer100g: 50.0 },
  { id: 61, name: 'Palta / Aguacate',               category: 'Grasas',              hcPer100g: 8.5,  proteinPer100g: 2.0,  fatPer100g: 15.0 },

  // Azúcares y dulces
  { id: 62, name: 'Azúcar',                         category: 'Azúcares y dulces',   hcPer100g: 100.0, proteinPer100g: 0.0,  fatPer100g: 0.0  },
  { id: 63, name: 'Miel',                           category: 'Azúcares y dulces',   hcPer100g: 82.0, proteinPer100g: 0.3,  fatPer100g: 0.0  },
  { id: 64, name: 'Mermelada',                      category: 'Azúcares y dulces',   hcPer100g: 70.0, proteinPer100g: 0.4,  fatPer100g: 0.0  },
  { id: 65, name: 'Dulce de leche',                 category: 'Azúcares y dulces',   hcPer100g: 55.0, proteinPer100g: 7.0,  fatPer100g: 8.0  },
  { id: 66, name: 'Chocolate amargo',               category: 'Azúcares y dulces',   hcPer100g: 50.0, proteinPer100g: 5.0,  fatPer100g: 33.0 },
]
