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
import generos from "../../../enums/genero"

export interface CalcHamwiProps {}

export const CalculatorHamwi: React.FC<CalcHamwiProps> = () => {
    const [result, setResult] = useState<number | undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)

    const schema = z.object({
        peso_actual: z.number().min(0).max(199.9),
        altura: z.number().min(0).max(250), 
        genero: z.nativeEnum(generos)
       })
    
       type PatienValues = z.infer<typeof schema>
    
       const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
       
       const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

       const resetFunc = () => {
        reset()
        setIsCalculating(false)
       }
    
       const handleCalculate = () => {
        if(!isCalculating) {
            setIsCalculating(true)
            onToggle()
        }
       }
    

    return (
        <Box>
            <form>
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
                </BoXContainer>
            </form>
        </Box>
    )
}