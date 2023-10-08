import {Box, StackDivider, Stack} from '@chakra-ui/react'
import stylesValues from '../../../stylesValues'

interface TableContainerProps {
    children: React.ReactNode
}

export const TableDesarrolladaContainer: React.FC<TableContainerProps> = ({children}) => {
    return(
        <Box 
            bg={stylesValues.colors.primary}
            color={stylesValues.colors.text}
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={["90vw", "900px"]} 
            padding={8} 
            borderRadius="md"
            overflow="auto"          

        >
            <Stack divider={<StackDivider />} spacing='3' align="center">
                {children}
            </Stack>
        </Box>
    )
}