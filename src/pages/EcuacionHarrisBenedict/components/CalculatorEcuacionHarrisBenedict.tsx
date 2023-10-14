import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CalculatorLayout } from "../../../components/calculatorLayout/CalculatorLayout";
import { ecuacionHarrisBenedict } from "../../../data/nutritionalFormulas";
import { EGenero } from "../../../enums/EGenero";
import { EGradoActividad } from "../../../enums/EGradoActividad";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";

interface CalcEcuHarrisBenedictProps {}

export const CalculatorEcuacionHarrisBenedict: React.FC<CalcEcuHarrisBenedictProps> = () => {

    const schema = z.object({
        altura: z.number().min(1).max(300),
        peso_actual: z.number().min(1).max(399.9),
        edad: z.number().min(1).max(150),
        genero: z.nativeEnum(EGenero),
        grado_actividad: z.nativeEnum(EGradoActividad)
    })

    type PatienValuesHarrisBenedict = z.infer<typeof schema>

    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesHarrisBenedict>()

    return (
        <CalculatorLayout 
            tag= "Estimación de necesidades energéticas"
            formFunction={ecuacionHarrisBenedict}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesHarrisBenedict}
            unit="Kg"
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
            <CustomInput
                label="Peso actual (kg)"
                name="peso_actual"
                register={register}
                error={errors.peso_actual?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"peso_actual"}
            />
            <CustomInput
                label="Edad"
                name="edad"
                register={register}
                error={errors.edad?.message}
                placeHolder="0"
                type="number"
                step={1}
                key={"edad"}
            />
            <CustomSelect
                label="Genero"
                name="genero"
                register={register}
                error={errors.genero?.message}
                placeholder="Genero"
                enumOptions={EGenero}
            />
            <CustomSelect
                label="Grado de actividad"
                name="grado_actividad"
                register={register}
                error={errors.grado_actividad?.message}
                placeholder="Grado de actividad"
                enumOptions={EGradoActividad}
            />
        </CalculatorLayout>
    )
}