import React from "react"
import { Th, Text } from "@chakra-ui/react"
import stylesValues from "../../../stylesValues"

interface ThCustomProps {
    children: React.ReactNode
    withDisplay: boolean
    withColSpan: boolean
}

export const ThCustom: React.FC<ThCustomProps> = ({children , withDisplay, withColSpan}) => {
    return(
        <Th 
            color={stylesValues.colors.text}
            display={withDisplay ? { base: "none", md: "table-cell"} : undefined}
            colSpan={withColSpan ? 3 : undefined}
        >
            <Text textAlign={"center"}>
                {children}
            </Text>
        </Th>
    )
}