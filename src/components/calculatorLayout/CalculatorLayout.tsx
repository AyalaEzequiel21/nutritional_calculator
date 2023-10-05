// import {useState} from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { 
//     Box, 
//     useDisclosure,
//     UseDisclosureReturn, 
//     Spinner 
// } from "@chakra-ui/react";
// import { CardResult } from "../cardResult/CardResult";
// import { BoXContainer } from "../boxContainer/BoxContainer";
// import { ButtonsPack } from "../buttonsPack/ButtonsPack";


// export interface CalcHamwiProps {
//     typeValues: 
//     tag: string
//     formula: ()=> string
//     children: React.ReactNode
// }

// export const CalculatorHamwi: React.FC<CalcHamwiProps> = ({
//     typeValues,
//     tag, 
//     formula, 
//     children
// }) => {
//     const [result, setResult] = useState<number | undefined>(undefined)
//     const [isCalculating, setIsCalculating] = useState<boolean>(false)

    
//        const { register, reset, handleSubmit, formState: {errors} } = useForm<PatienValues>()
       
//        const { isOpen, onToggle }: UseDisclosureReturn = useDisclosure()

       

//        const onSubmit: SubmitHandler<typeValues> = (data) => {
//            const {typeValues.xx, typeValues.yy} = data
//             if (yy.toString() !== "" && xx.toString() !== ""){
//                 if(!isOpen){
//                     setIsCalculating(true)
//                     const finalResult = formula(typesValues.yy, typesValues.xx)
//                     setResult(parseFloat(finalResult))
//                     onToggle()
//                     setIsCalculating(false)
//                 }
//         }
//     }

//     const resetFunction = () => {
//         if(isOpen){
//             reset()
//             setResult(undefined)
//             onToggle()
//         }
//     }

//     return (
//         <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <BoXContainer>
//                     {children}
//                 </BoXContainer>
//                 <ButtonsPack result={result}  resetFunction={resetFunction}/>
//             </form>
//             {isCalculating && <Spinner/>}
//             {result !== undefined && <CardResult isOpen={isOpen} tag={tag} value={result}/>}
//         </Box>
//     )
// }