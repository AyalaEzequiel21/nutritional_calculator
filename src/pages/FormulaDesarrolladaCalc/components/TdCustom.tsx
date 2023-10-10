import React from "react"
import { Td, Text } from "@chakra-ui/react"
import stylesValues from "../../../stylesValues"

interface TdCustomProps {
    children: React.ReactNode
    withDisplay: boolean
    maxWidth: boolean
}

export const TdCustom: React.FC<TdCustomProps> = ({children , withDisplay, maxWidth}) => {
    return(
        <Td 
            color={stylesValues.colors.text}
            display={withDisplay ? { base: "none", md: "table-cell"} : undefined}
            maxW={maxWidth ? {base: "55px", md: "65px"} : undefined}
            p={1}
        >
            <Text textAlign={"center"}>
                {children}
            </Text>
        </Td>
    )
}