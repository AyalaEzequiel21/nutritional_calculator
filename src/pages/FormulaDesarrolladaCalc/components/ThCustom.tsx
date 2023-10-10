import React from "react"
import { Th, Text } from "@chakra-ui/react"
import stylesValues from "../../../stylesValues"

interface ThCustomProps {
    children: React.ReactNode
    withDisplay: boolean
    withColSpan: boolean
    isYellow: boolean
}

export const ThCustom: React.FC<ThCustomProps> = ({children , withDisplay, withColSpan, isYellow}) => {
    return(
        <Th 
            color={isYellow ? stylesValues.colors.decorative : stylesValues.colors.text}
            display={withDisplay ? { base: "none", sm: "table-cell"} : undefined}
            colSpan={withColSpan ? 3 : undefined}
            paddingX={0}
            paddingY={3}
        >
            <Text textAlign={"center"}>
                {children}
            </Text>
        </Th>
    )
}