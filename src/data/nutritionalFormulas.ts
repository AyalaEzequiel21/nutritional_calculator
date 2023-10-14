// FORMULA PARA OBTENER EL INDICE DE MASA CORPORAL DE UNA PERSONA, RECIBE PESO ACTUAL(NUMBER) Y ALTURA(NUMBER)

import { EGenero } from "../enums/EGenero"
import { EGradoActividad } from "../enums/EGradoActividad";
    
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

   // FORMULA PARA OBTENER EL PORCENTAJE DE PERDIDA DE PESO, RECIBE PESO ACTUAL(NUMBER) Y PESO HABITUAL(NUMBER)
   
   export const getPorcentajePerdidaPeso = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 2) {
      const [pesoActual, pesoHabitual] = data

      if(typeof pesoActual === 'string' && typeof pesoHabitual === 'string'){
        const peso_actual_float = parseFloat(pesoActual);
        const peso_habitual_float = parseFloat(pesoHabitual);

        const firstStep = peso_habitual_float - peso_actual_float
        const secondStep = firstStep / peso_habitual_float
        const final = secondStep * 100

        return final.toFixed(2)
      }
    }
    return undefined
   }

  // FORMULA DESARROLLADA PARA OBTENER LAS KILOCALORIAS, RECIBE CANTIDADHC(NUMBER), CANTPROTEINA(NUMBER) Y CANTGRASA(NUMBER)
  
  export const formulaDesarrolladaFunction = (data: unknown[]): string | undefined => {
    if (Array.isArray(data) && data.length === 3){
      const [cantidadHC, cantidadP, cantidadG] = data
      
      if(typeof cantidadHC === 'number' && typeof cantidadP === 'number' && typeof cantidadG === 'number'){

        const kcal_HC = cantidadHC * 4
        const kcal_P = cantidadP * 4
        const kcal_G = cantidadG * 9

        return (kcal_HC + kcal_P + kcal_G).toFixed(2)
      }
    }
    return undefined
  }

  // FORMULA PARA OBTENER PESO IDEAL CORREGIDO SEGUN IMC BUSCADO, RECIBE ALTURA EN M (NUMBER) Y IMC BUSCADO(NUMBER)

  export const getPesoIdealSegunIMCBuscado = (data: unknown[]) : string | undefined => {
    if(Array.isArray(data) && data.length === 2){
      const [altura, imc_buscado] = data

      if(typeof altura === 'string' && typeof imc_buscado === 'string' ){
        const altura_float = parseFloat(altura)
        const imcBuscado_float = parseFloat(imc_buscado)
        const result = imcBuscado_float * (altura_float * altura_float)

        return result.toFixed(2)
      }
    }
    return undefined 
  }

  // ECUACION DE HARRIS BENEDICT PARA OBTENER UNA ESTIMACION DE LAS NECESIDADES ENERGETICAS

  export const ecuacionHarrisBenedict = (data: unknown[]): string | undefined => {
    if(Array.isArray(data) && data.length === 5){
      const [altura, peso_actual, edad, genero, grado_actividad] = data 
    if (
        typeof altura === 'string' && 
        typeof peso_actual === 'string' && 
        typeof edad === 'string' &&
        typeof genero === 'string' &&
        typeof grado_actividad === 'string'
        ){
          const altura_float = parseFloat(altura)
          const peso_actual_float = parseFloat(peso_actual)
          const edad_float = parseFloat(edad)
          let result = null
          
          const preResult = genero === EGenero.MASCULINO ? 
              66 + (13.7 * peso_actual_float) + (5 * altura_float) - (6.8 * edad_float)
              :
              655 + (9.7 * peso_actual_float) + (1.8 * altura_float) - (4.7 * edad_float)
          
          if(grado_actividad === EGradoActividad.MUY_LEVE){
            result = preResult * 1.3
          }
          if(grado_actividad === EGradoActividad.LEVE){
            genero === EGenero.FEMENINO ? 
              result = preResult * 1.5
            :
              result = preResult * 1.6
          }
          if(grado_actividad === EGradoActividad.MODERADA){
            genero === EGenero.FEMENINO ? 
            result = preResult * 1.6
          :
            result = preResult * 1.7          
          }
          if(grado_actividad === EGradoActividad.INTENSA){
            genero === EGenero.FEMENINO ? 
            result = preResult * 1.9
          :
            result = preResult * 2.1          
          }
          return result?.toFixed(2)
        } 
    }
    return undefined
  }