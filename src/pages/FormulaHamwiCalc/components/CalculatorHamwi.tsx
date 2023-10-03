import React, {useState} from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { 
    Box, 
    useDisclosure,
    UseDisclosureReturn, 
    Spinner 
} from "@chakra-ui/react";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import { genero } from "../../../enums/genero";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { CardResult } from "../../../components/cardResult/CardResult";

export interface CalcHamwiProps {}

export const CalculatorHamwi: React.FC<CalcHamwiProps> = () => {
    const [result, setResult] = useState<number | undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)


    const schema = z.object({
        peso_actual: z.number().min(0).max(199.9),
        altura: z.number().min(0).max(250), 
        genero: z.nativeEnum(genero)
       })
    
       type PatienValues = z.infer<typeof schema>

       const tag = "Peso ideal"
    
       const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
       
       const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

       const hamwiForm = (pesoActual: number, altura: number, genero: string) => {
        const pesoDeconstado = genero === "femenino" ? (pesoActual - 45.5) : (pesoActual - 47.7)
        const altReducida = altura - 150

        const cmDefault = altReducida / 2.5
        const weight = genero === "femenino" ? (cmDefault * 2.27) : (cmDefault * 2.72)

        return (weight + pesoDeconstado).toFixed(2)
        
       }

       const onSubmit: SubmitHandler<PatienValues> = (data) => {
        console.log("click", data);
        
           const {peso_actual, altura, genero} = data
            if (peso_actual !== undefined || altura !== undefined || genero !== undefined){
            if(!isOpen){
                setIsCalculating(true)
                const totalWeight = hamwiForm(peso_actual, altura, genero)
                setResult(parseFloat(totalWeight))
                onToggle()
                setIsCalculating(false)
            }
        }
    }

    const resetFunction = () => {
        if(isOpen){
            reset()
            setResult(undefined)
            onToggle()
        }
    }

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
                        enumOptions={genero}
                    />
                </BoXContainer>
                <ButtonsPack   resetFunction={resetFunction}/>
            </form>
            {isCalculating && <Spinner/>}
            {result !== undefined && <CardResult isOpen={isOpen} tag={tag} value={result}/>}
        </Box>
    )
}