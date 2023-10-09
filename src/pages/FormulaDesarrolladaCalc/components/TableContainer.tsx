import { Box} from '@chakra-ui/react'
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
            padding={1} 
            borderRadius="md"
            maxW={{base: "95%", xl: "1800px"}}
            marginX={"auto"}
            overflowX={"auto"}
        >
            {children}
        </Box>
    )
}