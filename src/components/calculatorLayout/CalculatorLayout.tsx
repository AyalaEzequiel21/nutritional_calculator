import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import { Box, Spinner, UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, FieldValues, UseFormHandleSubmit} from "react-hook-form";
import { CardResult, BoXContainer, ButtonsPack } from "..";



interface CalculatorLayoutProps{
    children: React.ReactNode
    tag: string
    formFunction: (data: unknown[]) => string | undefined
    reset: ()=> void
    handleSubmit: UseFormHandleSubmit<FieldValues>
    patienValues: FieldValues
    unit: string
}
export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
    children,
    tag, 
    formFunction,
    reset, 
    handleSubmit, 
    patienValues,
    unit
}) => {
    const [partialResult, setPartialResult] = useState<string | undefined>(undefined)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)
    const { results, setResults } = useGlobalContext()

    const { isOpen, onToggle } : UseDisclosureReturn = useDisclosure()

    const onSubmit: SubmitHandler<typeof patienValues> = (data) => {     
    
       const parametros = Object.values(data)
       
       if(!isOpen){
                setIsCalculating(true)
                const resultForm = formFunction(parametros)
                
                if(resultForm !== undefined && !isNaN(parseFloat(resultForm))){
                    setPartialResult(`${resultForm} ${unit}`)
                    onToggle()
                    setIsCalculating(false)
                }
                setIsCalculating(false)
        }
    }

    const resetFunction = () => {
        if(isOpen){
            reset()
            setPartialResult(undefined)
            onToggle()
            setResults({...results, [tag]: ""})
        }
    }

    useEffect(() => {
        if(partialResult !== undefined ){
            setResults({...results, [tag]: partialResult})
        }
    }, [partialResult])

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <BoXContainer>
                    {children}
                </BoXContainer>
                <ButtonsPack result={partialResult} resetFunction={resetFunction} />
            </form>
            {isCalculating && <Spinner/>}
            {partialResult !== undefined  && <CardResult isOpen={isOpen} tag={tag} value={partialResult} withPercentage={false}/>}
        </Box>  
    )
}