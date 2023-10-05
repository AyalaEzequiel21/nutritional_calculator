import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { BoXContainer } from "../../../components/boxContainer/BoxContainer";
import stylesValues from "../../../stylesValues";

interface ResultsTableProps {
    results: object
}

export const ResultsTable: React.FC<ResultsTableProps> = ({results}) => {
    return (
        <BoXContainer>
            <Table variant={"simple"} colorScheme={stylesValues.colors.text}>
                <TableCaption color={stylesValues.colors.text}>Resultados de las fórmulas</TableCaption>
                <Thead>
                    <Tr>
                        <Th color={stylesValues.colors.text}>Fórmula</Th>
                        <Th color={stylesValues.colors.decorative}>Resultado</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.entries(results).map(([formula, resultado]) => (
                        <Tr key={formula}>
                            <Td color={stylesValues.colors.text}>{formula}</Td>
                            <Td color={stylesValues.colors.decorative}>{resultado}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

        </BoXContainer>
    )
}