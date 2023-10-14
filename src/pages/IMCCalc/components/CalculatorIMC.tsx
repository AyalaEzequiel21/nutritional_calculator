import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput, CalculatorLayout } from "../../../components";
import { getIMC } from "../../../data/nutritionalFormulas";

interface CalculatorIMCProps {}

export const CalculatorIMC: React.FC<CalculatorIMCProps> = () => {

    const schema = z.object({
        peso_actual: z.number().min(0).max(299.9),
        altura: z.number().min(0).max(249.99)
    })

    type PatienValuesIMC = z.infer<typeof schema>

    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesIMC>()
   
    return (
        <CalculatorLayout
            tag="Indice de Masa Corporal"
            formFunction={getIMC} 
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesIMC}
            unit="Kg/m2"
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
                label="Altura (mts)"
                name="altura"
                register={register}
                error={errors.altura?.message}
                placeHolder="0.00"
                type="number"
                step={0.01}
                key={"altura"}
            />
        </CalculatorLayout>
    )
}