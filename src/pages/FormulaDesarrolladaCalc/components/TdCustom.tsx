import React from "react"
import { Td, Text } from "@chakra-ui/react"
import stylesValues from "../../../stylesValues"

interface TdCustomProps {
    children: React.ReactNode
    withDisplay: boolean
}

export const TdCustom: React.FC<TdCustomProps> = ({children , withDisplay}) => {
    return(
        <Td 
            color={stylesValues.colors.text}
            display={withDisplay ? { base: "none", md: "table-cell"} : undefined}
        >
            <Text textAlign={"center"}>
                {children}
            </Text>
        </Td>
    )
}