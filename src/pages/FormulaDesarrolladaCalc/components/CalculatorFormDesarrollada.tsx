import React from "react";
import { CalculatorLayout } from "../../../components/calculatorLayout/CalculatorLayout";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface CalculatorFormDesarProps {}

export const CalculatorFormDesarrollada: React.FC<CalculatorFormDesarProps> = () => {

    const schema = z.object({
        peso_actual: z.number().min(0).max(199.9),
        peso_ideal: z.number().min(0).max(199.9)
       })
    
       type PatienValues = z.infer<typeof schema>

       const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()

       const formFunctionXY = () => {
        console.log("formFunction");
        return "formFunction"
        
       }

    return (
        <CalculatorLayout
            tag="Formula desarrollada"
            formFunction={formFunctionXY}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValues}
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