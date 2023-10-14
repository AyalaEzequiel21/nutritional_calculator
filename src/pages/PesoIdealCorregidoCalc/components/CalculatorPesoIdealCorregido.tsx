import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { getPIC } from "../../../data/nutritionalFormulas";
import { CustomInput, CalculatorLayout } from "../../../components";


interface CalculatorPesoIdealCorregidoProps{}

export const CalculatorPesoIdealCorregido: React.FC<CalculatorPesoIdealCorregidoProps> = () => {
   
   const schema = z.object({
    peso_actual: z.number().min(0).max(199.9),
    peso_ideal: z.number().min(0).max(199.9)
   })

   type PatienValuesPIC = z.infer<typeof schema>

   const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesPIC>()
   
   return (
        <CalculatorLayout 
            tag="Peso ideal corregido"
            formFunction={getPIC}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesPIC}
            unit="Kg"
        >    
            <CustomInput 
                label="Peso Actual (Kg)"
                name="peso_actual"
                register={register}
                error={errors.peso_actual?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"actual"}
            />
            <CustomInput 
                label="Peso Ideal (Kg)"
                name="peso_ideal"
                register={register}
                error={errors.peso_ideal?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"ideal"}
            />
        </CalculatorLayout>
                
    )
}

