import React, { useState, useEffect } from "react";
import {
    Tr,
    Td,
    Input,
    Text,
  } from "@chakra-ui/react";
import { TypeAliment } from "../../../data/aliments";
import stylesValues from "../../../stylesValues";


interface TableRowProps {
    alimento: TypeAliment
    // updateTotals: (value: number, otherValue: number) => void;

}

export const TableRow: React.FC<TableRowProps> = ({
    alimento,
    // updateTotals
}) => {

    const [inputValue, setInputValue] = useState<number>(0)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)) 
    }

    const calculateTotal = (gr: number, defaultValue: number) => {        
        return (defaultValue * gr) / 100
    }   
    
    useEffect(() => {

      }, [inputValue]);

    return (
        <Tr key={alimento.name} color={stylesValues.colors.text}>
            <Td>
                {alimento.name}
            </Td>
            <Td display={{ base: "none", md: "table-cell"}} maxW={"60px"}>
                <Text textAlign={"center"}>
                    {alimento.HCPer100g === 0 ? "-" : alimento.HCPer100g}
                </Text>
            </Td>
            <Td display={{ base: "none", md: "table-cell"}} maxW={"60px"}>
                <Text textAlign={"center"}>
                    {alimento.ProteinPer100g === 0 ? "-" : alimento.ProteinPer100g}
                </Text>
            </Td>
            <Td display={{ base: "none", md: "table-cell"}} maxW={"60px"}>
                <Text textAlign={"center"}>
                    {alimento.GrPer100g === 0 ? "-" : alimento.GrPer100g}
                </Text>
            </Td>
            <Td maxW={"50px"}>
                <Input 
                    type="number"
                    bg={stylesValues.colors.text}
                    color={stylesValues.colors.primary}
                    max={2000}
                    onChange={(e) => onChange(e)}
                    w={"100%"}
                />
            </Td>
            <Td>
                <Text textAlign={"center"}>
                    {isNaN(calculateTotal(inputValue, alimento.HCPer100g)) || alimento.HCPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.HCPer100g).toFixed(1)}
                </Text>
            </Td>
            <Td>
                <Text textAlign={"center"}>
                    {isNaN(calculateTotal(inputValue, alimento.ProteinPer100g)) || alimento.ProteinPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.ProteinPer100g).toFixed(1)}
                </Text>
            </Td>
            <Td>
                <Text textAlign={"center"}>
                    {isNaN(calculateTotal(inputValue, alimento.GrPer100g)) || alimento.GrPer100g === 0 ? "-" : calculateTotal(inputValue, alimento.GrPer100g).toFixed(1)}
                </Text>
            </Td>
        </Tr>
    )
}
