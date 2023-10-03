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
import { CustomInput } from "../../../components/customInput/CustomInput";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { CardResult } from "../../../components/cardResult/CardResult";
import { EGenero } from "../../../enums/EGenero";

export interface CalcHamwiProps {}

export const CalculatorHamwi: React.FC<CalcHamwiProps> = () => {
    const [result, setResult] = useState<number | undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)


    const schema = z.object({
        altura: z.number().min(0).max(250), 
        genero: z.nativeEnum(EGenero)
       })
    
       type PatienValues = z.infer<typeof schema>

       const tag = "Peso ideal"
    
       const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
       
       const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

       const hamwiForm = (altura: number, genero: EGenero) => {
        const pesoDescontado = (genero === EGenero.FEMENINO) ? 45.5 : 47.7
        const altReducida = altura - 150
        const pesoADuplicar = (genero === EGenero.FEMENINO) ? 2.27 : 2.72
        const preResult = (altReducida * pesoADuplicar) / 2.5
        const pesoIdeal = preResult + pesoDescontado 
        return pesoIdeal.toFixed(2);
       }

       const onSubmit: SubmitHandler<PatienValues> = (data) => {
           const {altura, genero} = data
            if (altura.toString() !== "" && genero.toString() !== ""){
                if(!isOpen){
                    setIsCalculating(true)
                    const totalWeight = hamwiForm(altura, genero)
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
                </BoXContainer>
                <ButtonsPack   resetFunction={resetFunction}/>
            </form>
            {isCalculating && <Spinner/>}
            {result !== undefined && <CardResult isOpen={isOpen} tag={tag} value={result}/>}
        </Box>
    )
}