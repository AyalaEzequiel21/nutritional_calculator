import { UseDisclosureReturn, useDisclosure, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { CardResult } from "../../../components/cardResult/CardResult";

export interface CalculatorIMCProps {}

export const CalculatorIMC: React.FC<CalculatorIMCProps> = () => {

    const [result, setResult] = useState<number|undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)

    const schema = z.object({
        peso_actual: z.number().min(0).max(299.9),
        altura: z.number().min(0).max(249.99)
    })

    type PatienValues = z.infer<typeof schema>

    const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
   
    const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

    const getIMC = (peso_actual: number, altura: number) => {
        if(peso_actual !== undefined && altura !== undefined){
            const peso_actual_float = parseFloat(peso_actual.toString())
            const altura_float = parseFloat(altura.toString())

            const alturaAlCuadrado = altura_float * altura_float
            return (peso_actual_float / alturaAlCuadrado).toFixed(2)
        }
        return undefined
    }

    const resetFunc = () => {
        reset()
    }

    const onSubmit: SubmitHandler<PatienValues> = (data) => {
        const {peso_actual, altura} = data

        const imc = getIMC(peso_actual, altura)
        setResult(parseFloat(imc as string))
        setIsCalculating(false)
    }

    const tag = "Indice de Masa Corporal"

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <BoXContainer>
                    <CustomInput 
                        label="Peso Actual"
                        name="peso_actual"
                        register={register}
                        error={errors.peso_actual?.message}
                        placeHolder="0.0"
                        type="number"
                        step={0.1}
                        key={"actual"}
                    />
                    <CustomInput 
                        label="Altura"
                        name="altura"
                        register={register}
                        error={errors.altura?.message}
                        placeHolder="0.00"
                        type="number"
                        step={0.1}
                        key={"altura"}
                    />
                </BoXContainer>
                <ButtonsPack onToggle={onToggle} result={result} isCalculating={isCalculating} setIsCalculating={setIsCalculating} reset={resetFunc} />
            </form>
            {result !== undefined && !isNaN(result) && <CardResult isOpen={isOpen} tag={tag} value={result}/>}
        </Box>
    )
}