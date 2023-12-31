import React from "react"
import {Box, StackDivider, Stack} from '@chakra-ui/react'
import stylesValues from "../../stylesValues"

interface BoxContainerProps {
    children: React.ReactNode
}

export const BoXContainer: React.FC<BoxContainerProps> = ({children}) => {
    return (
        <Box
            bg={stylesValues.colors.primary}
            color={stylesValues.colors.text}
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={["85vw", "400px"]} 
            padding={8} 
            borderRadius="md" 
        >
            <Stack divider={<StackDivider />} spacing='3' align="center">
                {children}
            </Stack>
        </Box>
    )
}