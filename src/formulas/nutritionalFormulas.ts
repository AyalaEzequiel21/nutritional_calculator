// FORMULA PARA OBTENER EL INDICE DE MASA CORPORAL DE UNA PERSONA, RECIBE PESO ACTUAL(NUMBER) Y ALTURA(NUMBER)

import { EGenero } from "../enums/EGenero"
    
export const getIMC = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 2) {
      const [peso_actual, altura] = data;
  
      if (typeof peso_actual === 'string' && typeof altura === 'string') {
        const peso_actual_float = parseFloat(peso_actual.toString());
        const altura_float = parseFloat(altura.toString());
  
        const alturaAlCuadrado = altura_float * altura_float;
        return (peso_actual_float / alturaAlCuadrado).toFixed(2);
      }
    }
    return undefined;
  };

// FORMULA PARA OBTENER EL PESO IDEAL DE UNA PERSONA APLICANDO EL METODO HAMWI, RECIBE ALTURA(NUMBER) Y GENERO(STRING)

export const getHamwi = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 2){
        const [altura, genero] = data

        if (typeof altura === 'string' && typeof genero === 'string'){
            const pesoDescontado = (genero === EGenero.FEMENINO) ? 45.5 : 47.7
            const altReducida = parseFloat(altura) - 150
            const pesoADuplicar = (genero === EGenero.FEMENINO) ? 2.27 : 2.72
            const preResult = (altReducida * pesoADuplicar) / 2.5
            const pesoIdeal = preResult + pesoDescontado 
            return pesoIdeal.toFixed(2);
        }
    }
    return undefined
}

// FORMULA PARA OBTENER EL PESO IDEAL DE UNA PERSONA, RECIBE PESO ACTUAL(NUMBER) Y PESO IDEAL(NUMBER) 

export const getPIC = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 2){
        const [pesoActual, pesoIdeal] = data

        if (typeof pesoActual === 'string' && typeof pesoIdeal === 'string'){
            const peso_actual_float = parseFloat(pesoActual);
            const peso_ideal_float = parseFloat(pesoIdeal);
        
            const firstStep = peso_actual_float - peso_ideal_float
            const secondStep = firstStep * 0.25
            return (secondStep + peso_ideal_float).toFixed(2)
        }
    }
    return undefined
   }

   // FORMULA PARA OBTENER EL PORCENTAJE DE PESO USUAL, RECIBE PESO ACTUAL(NUMBER) Y PESO HABITUAL(NUMBER)

   export const getPPU = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 2){
      const [pesoActual, pesoHabitual] = data

      if(typeof pesoActual === 'string' && typeof pesoHabitual === 'string'){
        const firstStep = parseFloat(pesoActual) / parseFloat(pesoHabitual)
        const secondStep = firstStep * 100
        return secondStep.toFixed(2)
      }
    }
    return undefined
   }