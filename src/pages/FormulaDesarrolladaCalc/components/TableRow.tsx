import React, { useState, useEffect } from "react";
import {
    Tr,
    Td,
    Input, 
    FormControl
  } from "@chakra-ui/react";
import { TypeAliment } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { TdCustom } from "./TdCustom";
import { handleKeyPress } from "../../../utils/utils";



interface TableRowProps<T extends FieldValues> {
    alimento: TypeAliment
    register: UseFormRegister<T>
    inputRef: (el: HTMLInputElement | null) => void
    updateTotals: ()=> void

}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableRow: React.FC<TableRowProps<any>> = ({
    alimento,
    register,
    inputRef,
    updateTotals
}) => {

    const [inputValue, setInputValue] = useState<number>(0)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
        setInputValue(value) 
    }

    const calculateTotal = (gr: number, defaultValue: number) => {  
        const result = (defaultValue * gr) / 100
              
        return result
    }   
    
    useEffect(()=> {
        updateTotals()
        
    }, [inputValue])

    return (
        <Tr key={alimento.name} color={stylesValues.colors.text}>
            <Td p={1}>
                {alimento.name}
            </Td>
            <TdCustom withDisplay={true} maxWidth={true} isYellow={false}>
                {alimento.HCPer100g === 0 ? "-" : alimento.HCPer100g}
            </TdCustom>
            <TdCustom withDisplay={true} maxWidth={true} isYellow={false}>
                {alimento.ProteinPer100g === 0 ? "-" : alimento.ProteinPer100g}
            </TdCustom>
            <TdCustom withDisplay={true} maxWidth={true} isYellow={false}>
                {alimento.GrPer100g === 0 ? "-" : alimento.GrPer100g}
            </TdCustom>
            <Td maxW={{base: "50px", md: "60px"}} p={2}>
                <FormControl>
                    <Input 
                        type="number"
                        {...register(alimento.name)}
                        bg={stylesValues.colors.text}
                        color={stylesValues.colors.primary}
                        max={2000}
                        p={1}
                        onChange={(e) => onChange(e)}
                        textAlign={"center"}
                        ref={(el) => {
                            inputRef(el);
                            if (el) {
                            el.dataset.hcper100g = String((alimento.HCPer100g) / 100);
                            el.dataset.proteinper100g = String((alimento.ProteinPer100g) / 100);
                            el.dataset.grper100g = String((alimento.GrPer100g) / 100);
                            }
                        }}
                        onKeyDown={handleKeyPress}
                    />
                </FormControl>
            </Td>
            <TdCustom withDisplay={false} maxWidth={true} isYellow={true}>
                {isNaN(calculateTotal(inputValue, alimento.HCPer100g)) || alimento.HCPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.HCPer100g).toFixed(1)}
            </TdCustom>
            <TdCustom withDisplay={false} maxWidth={true} isYellow={true}>
                {isNaN(calculateTotal(inputValue, alimento.ProteinPer100g)) || alimento.ProteinPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.ProteinPer100g).toFixed(1)}
            </TdCustom>
            <TdCustom withDisplay={false} maxWidth={true} isYellow={true}>
                {isNaN(calculateTotal(inputValue, alimento.GrPer100g)) || alimento.GrPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.GrPer100g).toFixed(1)}
            </TdCustom>
        </Tr>
    )
}
