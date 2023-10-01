import React, {useState} from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { 
    Box, 
    Button, 
    ButtonGroup,
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Heading, 
    Input
} from "@chakra-ui/react";



export interface CalculatorPesoIdealProps{

}

export const CalculatorPesoIdealCorregido: React.FC<CalculatorPesoIdealProps> = () => {
   const [result, setResult] = useState<number | undefined>(undefined)

   
   
   const schema = z.object({
    peso_actual: z.number().min(0).max(199.9),
    peso_ideal: z.number().min(0).max(199.9)
   })

   type PatienValues = z.infer<typeof schema>

   const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()

   const onSubmit: SubmitHandler<PatienValues> = (data) => {
    const { peso_actual, peso_ideal } = data;

    const peso_actual_float = parseFloat(peso_actual.toString());
    const peso_ideal_float = parseFloat(peso_ideal.toString());

    const firstStep = peso_actual_float - peso_ideal_float
    const secondStep = firstStep * 0.25
    const pic = secondStep + peso_ideal_float
    setResult(pic)
   }

   const onReset = () => {
    reset()
    setResult(undefined)
   }


    return (
        <Box p={20} >
           <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.peso_actual}>
                    <FormLabel>Peso actual</FormLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("peso_actual")}
                        placeholder="Peso actual"
                    />
                    <FormErrorMessage>{errors.peso_actual?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.peso_ideal} mt={5}>
                    <FormLabel>Peso Ideal</FormLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("peso_ideal")}
                        placeholder="Peso ideal"
                    />
                    <FormErrorMessage>{errors.peso_ideal?.message}</FormErrorMessage>
                </FormControl>
                <ButtonGroup>
                    <Button colorScheme="red" onClick={onReset} mt={5}>
                        RESET
                    </Button>
                    <Button colorScheme="teal" type="submit" mt={5}>
                        CALCULAR
                    </Button>
                </ButtonGroup>
           </form>
           {result !== undefined && !isNaN(result) && <Heading textAlign={"center"} mt={5}>{result}</Heading>}
        </Box>
    )
}

