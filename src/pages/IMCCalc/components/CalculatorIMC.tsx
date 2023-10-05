import { UseDisclosureReturn, useDisclosure, Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { CardResult } from "../../../components/cardResult/CardResult";
import { useGlobalContext } from "../../../context/useGlobalContext";

export interface CalculatorIMCProps {}

export const CalculatorIMC: React.FC<CalculatorIMCProps> = () => {

    const [resultIMC, setResultIMC] = useState<number|undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)

    const {results, setResults} = useGlobalContext()

    const schema = z.object({
        peso_actual: z.number().min(0).max(299.9),
        altura: z.number().min(0).max(249.99)
    })

    type PatienValues = z.infer<typeof schema>

    const tag = "Indice de Masa Corporal"

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

    const resetFunction = () => {
        if(isOpen){
            reset()
            setResultIMC(undefined)
            onToggle()
            setResults({...results, indice_masa_corporal: 0})
        }
    }


    const onSubmit: SubmitHandler<PatienValues> = (data) => {
        const {peso_actual, altura} = data
        if(peso_actual.toString() !== "" && altura.toString() !== ""){
            if(!isOpen){
                setIsCalculating(true)
                const imc = getIMC(peso_actual, altura)
                setResultIMC(parseFloat(imc as string))
                onToggle()
                setIsCalculating(false)
            }
        }        
    }

    useEffect(()=> {
        if(resultIMC !== undefined){
            setResults({...results, indice_masa_corporal: resultIMC})
        }
    }, [resultIMC])


    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <BoXContainer>
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
                </BoXContainer>
                <ButtonsPack result={resultIMC} resetFunction={resetFunction}/>
            </form>
            {isCalculating && <Spinner/>}
            {resultIMC !== undefined && <CardResult isOpen={isOpen} tag={tag} value={resultIMC}/>}
        </Box>
    )
}