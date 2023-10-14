import { z } from "zod"
import { useForm } from "react-hook-form";
import { CalculatorLayout } from "../../../components/calculatorLayout/CalculatorLayout";
import { getPesoIdealSegunIMCBuscado } from "../../../data/nutritionalFormulas";
import { CustomInput } from "../../../components/customInput/CustomInput";

interface CalcPISegunImcProps {}

export const CalculatorPISegunIMCBuscado: React.FC<CalcPISegunImcProps> = () => {
    
    const schema = z.object({
        altura: z.number().min(1).max(250),
        imc_buscado: z.number().min(1).max(299.00)
    })

    type PatienValuesPIsIMC = z.infer<typeof schema>

    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesPIsIMC>()

    return (
        <CalculatorLayout
            tag="Peso ideal según IMC buscado"
            formFunction={getPesoIdealSegunIMCBuscado}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesPIsIMC}
            unit="Kg"
        >
            <CustomInput
                label="Altura (m)"
                name="altura"
                register={register}
                error={errors.altura?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"altura"}
            />
            <CustomInput
                label="IMC buscado (kg)"
                name="imc_buscado"
                register={register}
                error={errors.imc_buscado?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"IMC"}
            />
        </CalculatorLayout>
    )
}