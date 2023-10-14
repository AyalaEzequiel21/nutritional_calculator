import { z } from "zod";
import { useForm } from "react-hook-form";
import { getPPU } from "../../../data/nutritionalFormulas";
import { CalculatorLayout, CustomInput } from "../../../components";

interface CalculatorPPUProps {}

export const CalculatorPPU: React.FC<CalculatorPPUProps> = () => {

    const schema = z.object({
        peso_actual: z.number().min(0).max(299.9),
        peso_habitual: z.number().min(0).max(299.9)
    })

    type PatienValuesPPU = z.infer<typeof schema>

    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValuesPPU>()
    
    return (
        <CalculatorLayout 
            tag="Porcentaje Peso Usual"
            formFunction={getPPU}
            handleSubmit={handleSubmit}
            reset={reset}
            patienValues={{} as PatienValuesPPU}
            unit="%"
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
                label="Peso Habitual (Kg)"
                name="peso_habitual"
                register={register}
                error={errors.peso_habitual?.message}
                placeHolder="0.0"
                type="number"
                step={0.1}
                key={"habitual"}
            />
        </CalculatorLayout>
    )
}