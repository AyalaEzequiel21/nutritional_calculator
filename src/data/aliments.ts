export const ALIMENTS = [
    {
        name: "Leche entera", 
        HCPer100g: 5, 
        ProteinPer100g: 3, 
        GrPer100g: 3 
    },
    {
        name: "Leche descremada", 
        HCPer100g: 5, 
        ProteinPer100g: 3, 
        GrPer100g: 1.5 
    },
    {
        name: "Queso", 
        HCPer100g: 4, 
        ProteinPer100g: 20, 
        GrPer100g: 9 
    },
    {
        name: "Queso untable", 
        HCPer100g: 5.5, 
        ProteinPer100g: 10, 
        GrPer100g: 11
    },
    {
        name: "Queso untable descremado", 
        HCPer100g: 5.5, 
        ProteinPer100g: 10, 
        GrPer100g: 5.5
    },
    {
        name: "Huevo", 
        HCPer100g: 0, 
        ProteinPer100g: 12, 
        GrPer100g: 12
    },
    {
        name: "Clara de huevo(30%)", 
        HCPer100g: 0, 
        ProteinPer100g: 11.6, 
        GrPer100g: 0
    },
    {
        name: "Carne promedio", 
        HCPer100g: 0, 
        ProteinPer100g: 20, 
        GrPer100g: 5
    },
    {
        name: "Carne vacuna", 
        HCPer100g: 0, 
        ProteinPer100g: 20, 
        GrPer100g: 7
    },
    {
        name: "Pollo", 
        HCPer100g: 0, 
        ProteinPer100g: 20, 
        GrPer100g: 5
    },
    {
        name: "Pescado", 
        HCPer100g: 0, 
        ProteinPer100g: 20, 
        GrPer100g: 3
    },
    {
        name: "Vegetales AB", 
        HCPer100g: 5.5, 
        ProteinPer100g: 1, 
        GrPer100g: 0
    },
    {
        name: "Vegetales c", 
        HCPer100g: 20, 
        ProteinPer100g: 2, 
        GrPer100g: 0
    },
    {
        name: "Cereales", 
        HCPer100g: 70, 
        ProteinPer100g: 12, 
        GrPer100g: 0
    },
    {
        name: "Legumbres", 
        HCPer100g: 59, 
        ProteinPer100g: 20, 
        GrPer100g: 2
    },
    {
        name: "Frutas", 
        HCPer100g: 12, 
        ProteinPer100g: 1, 
        GrPer100g: 0
    },
    {
        name: "Pan", 
        HCPer100g: 60, 
        ProteinPer100g: 10, 
        GrPer100g: 0
    },
    {
        name: "Pan integral", 
        HCPer100g: 50, 
        ProteinPer100g: 10, 
        GrPer100g: 1.6
    },
    {
        name: "Galletitas", 
        HCPer100g: 70, 
        ProteinPer100g: 10, 
        GrPer100g: 10
    },
    {
        name: "Aceite", 
        HCPer100g: 0, 
        ProteinPer100g: 0, 
        GrPer100g: 100
    },
    {
        name: "Crema",
        HCPer100g: 2, 
        ProteinPer100g: 2, 
        GrPer100g: 40
    },
    {
        name: "Manteca", 
        HCPer100g: 0, 
        ProteinPer100g: 0, 
        GrPer100g: 84
    },
    {
        name: "Azucar", 
        HCPer100g: 100, 
        ProteinPer100g: 0, 
        GrPer100g: 0
    },
    {
        name: "Mermelada", 
        HCPer100g: 70, 
        ProteinPer100g: 0, 
        GrPer100g: 0
    },
]

export type TypeAliment = {
    name: string,
    HCPer100g: number,
    ProteinPer100g: number,
    GrPer100g: number
}