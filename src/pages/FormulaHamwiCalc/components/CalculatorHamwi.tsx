import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";
import { EGenero } from "../../../enums/EGenero";
import { CalculatorLayout } from "../../../components/calculatorLayout/CalculatorLayout";
import { getHamwi } from "../../../data/nutritionalFormulas";


interface CalcHamwiProps {}

export const CalculatorHamwi: React.FC<CalcHamwiProps> = () => {

    const schema = z.object({
        altura: z.number().min(1).max(250), 
        genero: z.nativeEnum(EGenero)
       })
    
    type PatienValuesHamwi = z.infer<typeof schema>
    
    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesHamwi>()

    return (
        <CalculatorLayout 
            tag= "Peso ideal"
            formFunction={getHamwi}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesHamwi}
            unit="Kcal"
        >
            <CustomInput 
                label="Altura (cm)"
                name="altura"
                register={register}
                error={errors.altura?.message}
                placeHolder="0"
                type="number"
                step={1}
                key={"altura"}
            />
            <CustomSelect 
                label="Genero"
                name="genero"
                register={register}
                error={errors.genero?.message}
                placeholder="Genero"
                enumOptions={EGenero}
            />
        </CalculatorLayout>          
    )
}