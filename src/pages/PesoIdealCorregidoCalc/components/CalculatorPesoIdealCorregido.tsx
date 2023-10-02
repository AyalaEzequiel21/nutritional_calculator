import React, {useState} from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { 
    Box, 
    useDisclosure,
    UseDisclosureReturn
} from "@chakra-ui/react";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import { CustomInput } from "../../../components/customInput/CustomInput";
import { ButtonsPack } from "../../../components/buttonsPack/ButtonsPack";
import { CardResult } from "../../../components/cardResult/CardResult";


export interface CalculatorPesoIdealProps{}

export const CalculatorPesoIdealCorregido: React.FC<CalculatorPesoIdealProps> = () => {
   const [result, setResult] = useState<number | undefined>(undefined)
   const [isCalculating, setIsCalculating] = useState<boolean>(false)

   
   const schema = z.object({
    peso_actual: z.number().min(0).max(199.9),
    peso_ideal: z.number().min(0).max(199.9)
   })

   type PatienValues = z.infer<typeof schema>

   const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
   
   const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

   const getPIC = (pesoActual: number, pesoIdeal: number) => {
    if(pesoActual !== undefined && pesoIdeal !== undefined){
        const peso_actual_float = parseFloat(pesoActual.toString());
        const peso_ideal_float = parseFloat(pesoIdeal.toString());
    
        const firstStep = peso_actual_float - peso_ideal_float
        const secondStep = firstStep * 0.25
        return secondStep + peso_ideal_float
    }
    return undefined
   }

   const resetFunc = () => {
    reset()
   }

   const onSubmit: SubmitHandler<PatienValues> = (data) => {
    const { peso_actual, peso_ideal } = data;
    const pic = getPIC(peso_actual, peso_ideal)
    setResult(pic)
    setIsCalculating(false)
   }

   const tag = "Peso ideal corregido"

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
                            label="Peso Ideal"
                            name="peso_ideal"
                            register={register}
                            error={errors.peso_ideal?.message}
                            placeHolder="0.0"
                            type="number"
                            step={0.1}
                            key={"ideal"}
                        />
                </BoXContainer>
                <ButtonsPack onToggle={onToggle} result={result} isCalculating={isCalculating} setIsCalculating={setIsCalculating} reset={resetFunc}/>
           </form>
           {result !== undefined && !isNaN(result) && <CardResult isOpen={isOpen} tag={tag} value={result}/>}
        </Box>
    )
}

